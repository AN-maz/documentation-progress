// Ubah
$(function(){

    // Tombol Tambah Ditekan
    $('.tombolTambahData').on('click',function(){
        $('#judulModalLabel').text('Tambah Data Mahasiswa');
        $('.modal-footer button[type=submit]').text('Tambah Data');
    })

    // TOmbol Ubah ditekan
    $('.tombolModalUbah').on('click',function(){
        $('#judulModalLabel').text('Ubah Data Mahasiswa');
        $('.modal-footer button[type=submit]').text('Ubah Data');

        $('.modal-body form').attr('action','http://localhost/phpmvc/pertemuan_11/public/mahasiswa/ubah');

        const id = $(this).data('id');
        // console.log(id);

        $.ajax({
            url:'http://localhost/phpmvc/pertemuan_11/public/mahasiswa/getubah',
            data: {id:id},
            method: 'post',
            dataType: 'json',
            success: function(data){
                // console.log(data.NIM);
                $('#nama').val(data.nama);
                $('#nim').val(data.NIM);
                $('#email').val(data.email);
                $('#jurusan').val(data.jurusan);
                $('#id').val(data.id);

            }
            
        });
        

    })
});