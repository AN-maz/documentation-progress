<?php

class About extends Controller
{

    public function index()
    {


        $data['judul'] = 'About';
        $data['divisions'] = $this->model('Structure_model')->getAllDivisions();

        $this->view('templates/header', $data);
        $this->view('about/index');
        $this->view('templates/footer');
    }

    public function division($slug = null)
    {
        if (!$slug) {
            header('Location: ' . BASEURL . '/about');
            exit;
        }

        $division = $this->model('Structure_model')->getDivisionBySlug($slug);

        if (!$division) {
            header('Location: ' . BASEURL . '/about');
            exit;
        }

        $data['judul'] = $division['nama_divisi'];
        $data['active_page'] = 'About';
        $data['division'] = $division;

        $data['division']['proker_list'] = json_decode($division['proker'], true);

        $data['members'] = $this->model('Structure_model')->getMembersByDivisionId($division['id_divisi']);

        $this->view('templates/header', $data);
        $this->view('about/detail', $data); 
        $this->view('templates/footer');
    }
}
