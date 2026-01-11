<?php

class AuthApi extends ApiController
{

    public function login()
    {

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->response(null, 'Method Not Allowed', 405);
        }

        $input = $this->input();

        if (!isset($input['email']) || !isset($input['password'])) {
            $this->response(null, 'Email and Password are required', 400);
        }

        $user = $this->model('User_model')->getUserByEmail($input['email']);

        if ($user) {

            if (password_verify($input['password'], $user['password'])) {

                if ($user['role'] == 'user' && $user['is_approved'] == 0) {
                    $this->response(null, 'Akun belum disetujui Admin. Silahkan tunggu.', 403);
                }

                unset($user['password']);

                // Di API modern biasanya pakai Token (JWT), tapi untuk belajar,

                $this->response([
                    'user' => $user,
                    'message' => 'Login successful'
                ]);
            } else {
                $this->response(null, 'Password Salah', 401);
            }
        } else {
            $this->response(null, 'Email tidak ditemukan', 404);
        }
    }

    // API REGISTER
    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->response(null, 'Method Not Allowed', 405);
        }

        $input = $this->input();

        if (!isset($input['nama']) || !isset($input['email']) || !isset($input['password'])) {
            $this->response(null, 'Nama, Email, and Password are required', 400);
        }

        $data = [
            'nama' => $input['nama'],
            'nim' => $input['nim'] ?? '',
            'email' => $input['email'],
            'password' => $input['password'],
            'jurusan' => $input['jurusan'] ?? 'Umum',
            'alasan' => $input['alasan'] ?? ''
        ];

        if ($this->model('User_model')->registerUser($data) > 0) {
            $this->response($data, 'Berhasil Mendaftar! Tunggu persetujuan Admin.', 201);
        } else {
            $this->response(null, 'Gagal Mendaftar. Email/NIM mungkin sudah ada.', 500);
        }
    }
}
