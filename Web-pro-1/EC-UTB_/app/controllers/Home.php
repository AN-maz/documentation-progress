<?php

class Home extends Controller
{

    public function index()
    {

        $data['judul'] = 'Home';
        $data['news'] = $this->model('News_model')->getLatestNews(3);
        $this->view('templates/header', $data);
        $this->view('home/index', $data);
        $this->view('templates/footer');
    }

    public function news()
    {
        $data['judul'] = 'Berita & Artikel';
        $data['active_page'] = 'Home';

        // KONFIGURASI PAGINATION
        $jumlahDataPerHalaman = 6;
        $jumlahData = $this->model('News_model')->countAllNews();
        $jumlahHalaman = ceil($jumlahData / $jumlahDataPerHalaman);


        $halamanAktif = (isset($_GET['page'])) ? (int)$_GET['page'] : 1;
        $awalData = ($jumlahDataPerHalaman * $halamanAktif) - $jumlahDataPerHalaman;
        $data['news'] = $this->model('News_model')->getNewsPerPage($awalData, $jumlahDataPerHalaman);

        $data['halamanAktif'] = $halamanAktif;
        $data['jumlahHalaman'] = $jumlahHalaman;

        $this->view('templates/header', $data);
        $this->view('home/news', $data);
        $this->view('templates/footer');
    }

    public function newsDetail($slug)
    {

        $news = $this->model('News_model')->getNewsBySlug($slug);

        if (!$news) {
            header('Location: ' . BASEURL . '/home/news');
            exit;
        }

        $data['judul'] = $news['judul'];
        $data['active_page'] = 'Home';
        $data['news'] = $news;

        $this->view('templates/header', $data);
        $this->view('home/news_detail', $data); 
        $this->view('templates/footer');
    }
}
