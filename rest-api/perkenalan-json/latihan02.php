<?php
header('Content-Type: application/json');

$data = file_get_contents('coba.json');
$mahasiwa = json_decode($data,true);

var_dump($mahasiwa);

// echo $mahasiwa;