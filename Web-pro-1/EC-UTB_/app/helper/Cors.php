<?php

$allowedOrigins = [
    "http://127.0.0.1:5500",
    "http://localhost",
    "https://zynone.my.id",
    "http://localhost:8000",
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ', $origin);
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    
    if(in_array($origin,$allowedOrigins)){
        http_response_code(200);
    }else{
        http_response_code(403);
    }
    exit;
}
