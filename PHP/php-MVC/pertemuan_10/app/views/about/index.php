<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman About</title>
</head>

<body>

    <div class="container my-5">
        <div class="p-5 mb-4 bg-light rounded-3 shadow">
            <div class="row align-items-center">
                <div class="col-md-4 text-center">
                    <img src="<?= BASEURL; ?>/img/meko.jpg" class="img-fluid rounded-circle shadow-sm" alt="meko.jpg">
                </div>
                <div class="col-md-8">
                    <h1 class="display-5 fw-bold">About Me</h1>
                    <p class="lead">
                        Halo! nama saya <?= $data['nama']; ?>, umur saya <?= $data['umur']; ?>, saya adalah seorang <?= $data['pekerjaan']; ?>
                    </p>
                </div>
            </div>
        </div>
    </div>

</body>

</html>