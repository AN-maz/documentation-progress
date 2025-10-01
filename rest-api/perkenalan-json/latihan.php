<?php
header('Content-Type: application/json');

// $mahasiswa = [
//     [
//         "nama" => "Purwa Guri",
//         "NIM" => "245512345",
//         "email" => "purwaguri77@gmail.com"
//     ],
//     [
//         "nama" => "Purwa Guri2",
//         "NIM" => "2455123411",
//         "email" => "purwagur11@gmail.com"
//     ]

// ];


$dbh = new PDO('mysql:host=localhost;dbname=db_damkar', 'root', "");

$db = $dbh->prepare('SELECT * FROM laporan');
$db->execute();
$laporan = $db->fetchAll(PDO::FETCH_ASSOC);

$data = json_encode($laporan);
echo $data;
