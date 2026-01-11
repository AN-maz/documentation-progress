<?php

class Users extends ApiController
{
    public function index($id = null)
    {
        $userModel = $this->model('User_model');
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case 'GET':
                if ($id) {
                    $user = $userModel->getUserById($id);
                    if ($user) {
                        unset($user['password']); 
                        $this->response($user);
                    } else {
                        $this->response(null, 'User not found', 404);
                    }
                } else {
                    $data = $userModel->getAllUsers();
                    // Hapus password dari list user
                    foreach ($data as &$user) {
                        unset($user['password']);
                    }
                    echo json_encode([
                        'status' => 'success',
                        'data' => $data,
                        'count' => count($data)
                    ]);
                }
                break;

            case 'PUT':
                if (!$id) {
                    $this->response(null, 'User ID is required', 400);
                }

                $input = $this->input();
                $existingUser = $userModel->getUserById($id);

                if (!$existingUser) {
                    $this->response(null, 'User not found', 404);
                }

                $data = [
                    'nama' => $input['nama'] ?? $existingUser['nama'],
                    'nim' => $input['nim'] ?? $existingUser['nim'],
                    'jurusan' => $input['jurusan'] ?? $existingUser['jurusan'],
                    'status_keanggotaan' => $input['status_keanggotaan'] ?? $existingUser['status_keanggotaan'],
                    'is_approved' => isset($input['is_approved']) ? (int)$input['is_approved'] : $existingUser['is_approved']
                ];

                if ($userModel->updateUser($id, $data) > 0) {
                    $this->response($data, 'User updated successfully');
                } else {
                    $this->response(null, 'Failed to update user', 500);
                }
                break;

            default:
                $this->response(null, 'Method not allowed', 405);
                break;
        }
    }
}