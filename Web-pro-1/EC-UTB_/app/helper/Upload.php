<?php

class Upload {
    
    public static function uploadImage($file, $oldImage = null) {
        $uploadDir = '../public/images/news/';
        
        // Buat folder jika belum ada
        if(!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        $maxSize = 5 * 1024 * 1024; // 5MB
        
        // Validasi file
        if(!isset($file['tmp_name']) || $file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'message' => 'Error uploading file'];
        }
        
        // Validasi tipe file
        $fileType = mime_content_type($file['tmp_name']);
        if(!in_array($fileType, $allowedTypes)) {
            return ['success' => false, 'message' => 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed'];
        }
        
        // Validasi ukuran file
        if($file['size'] > $maxSize) {
            return ['success' => false, 'message' => 'File size exceeds 5MB limit'];
        }
        
        // Generate nama file unik
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = 'news_' . time() . '_' . uniqid() . '.' . $extension;
        $targetPath = $uploadDir . $fileName;
        
        // Upload file
        if(move_uploaded_file($file['tmp_name'], $targetPath)) {
            // Hapus file lama jika ada
            if($oldImage && file_exists($uploadDir . $oldImage)) {
                unlink($uploadDir . $oldImage);
            }
            return ['success' => true, 'filename' => $fileName];
        } else {
            return ['success' => false, 'message' => 'Failed to move uploaded file'];
        }
    }
    
    public static function deleteImage($filename) {
        $uploadDir = '../public/images/news/';
        $filePath = $uploadDir . $filename;
        
        if(file_exists($filePath) && is_file($filePath)) {
            return unlink($filePath);
        }
        return false;
    }
}
