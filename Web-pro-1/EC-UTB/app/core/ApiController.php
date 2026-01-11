<?php

class ApiController extends Controller
{
    public function __construct()
    {
        header('Content-Type: application/json');
    }

    protected function response($data = null, $message = null, $status = 200)
    {
        http_response_code($status);
        
        $response = [
            'status' => ($status >= 200 && $status < 300) ? 'success' : 'error',
        ];

        if ($message) {
            $response['message'] = $message;
        }

        if ($data) {
            $response['data'] = $data;
        }

        echo json_encode($response);
        exit;
    }
    
    protected function input()
    {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }
}