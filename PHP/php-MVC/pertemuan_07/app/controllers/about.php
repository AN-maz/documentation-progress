<?php

class About extends Controller
{

    public function index($name = 'Muslim', $pekerjaan = 'tergantung', $umur = 5)
    {

        $data['nama'] = $name;
        $data['pekerjaan'] = $pekerjaan;
        $data['umur'] = $umur;

        $data['judul'] = 'About Me';
        $this->view('templates/header');
        $this->view('about/index', $data);
        $this->view('templates/footer');
    }
    public function page()
    {

        $data['judul'] = 'Pages';
        $this->view('templates/header',$data);
        $this->view('about/page');
        $this->view('templates/footer');
    }
}
