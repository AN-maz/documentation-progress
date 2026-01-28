<?php 

class Flasher {
    public static function setFlash($pesan, $aksi, $tipe) {
        $_SESSION['flash'] = [
            'pesan' => $pesan,
            'aksi'  => $aksi,
            'tipe'  => $tipe
        ];
    }

    public static function flash() {
        if( isset($_SESSION['flash']) ) {
            $tipe = $_SESSION['flash']['tipe'];
            $bgColor = 'bg-yellow-100';
            $textColor = 'text-yellow-800';
            
            switch($tipe) {
                case 'green':
                    $bgColor = 'bg-green-100';
                    $textColor = 'text-green-800';
                    break;
                case 'red':
                    $bgColor = 'bg-red-100';
                    $textColor = 'text-red-800';
                    break;
                case 'yellow':
                default:
                    $bgColor = 'bg-yellow-100';
                    $textColor = 'text-yellow-800';
                    break;
            }
            
            echo '<div class="p-4 mb-4 text-sm rounded-lg ' . $bgColor . ' ' . $textColor . '" role="alert">'
                 . '<span class="font-medium">'. htmlspecialchars($_SESSION['flash']['pesan']) .'</span> ' . htmlspecialchars($_SESSION['flash']['aksi']) .
                  '</div>';
            unset($_SESSION['flash']);
        }
    }
}