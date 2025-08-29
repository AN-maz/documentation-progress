<div class="container" style="margin-top: 2em;">

    <div class="row">
        <div class="col-6">
            <h3>Daftar Mahasiswa</h3>

            <?php foreach( $data['mhs'] as $mhs) : ?>

                <ul>
                    <li><?=$mhs['nama']; ?></li>
                    <li><?=$mhs['NIM']; ?></li>
                    <li><?=$mhs['email']; ?></li>
                    <li><?=$mhs['jurusan']; ?></li>
                </ul>

            <?php endforeach ?>
        </div>
    </div>
    
</div>