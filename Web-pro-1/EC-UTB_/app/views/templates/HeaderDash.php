<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> <?= $data['judul'] ?> - Dashboard</title>
    <link href="<?= BASEURL; ?>/css/output.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }

        @media (min-width: 1024px) {
            .desktop-sidebar-offset {
                margin-left: 16rem !important;
            }
        }
    </style>

    <script src="<?= BASEURL; ?>/js/vendor/xlsx.full.min.js"></script>
    <script src="<?= BASEURL; ?>/js/vendor/pdfmake.min.js"></script>
    <script src="<?= BASEURL; ?>/js/vendor/vfs_fonts.js"></script>
    <script src="<?= BASEURL; ?>/js/vendor/exceljs.min.js"></script>
    <script src="<?= BASEURL; ?>/js/vendor/FileSaver.min.js"></script>
</head>
<body class="bg-gray-50">