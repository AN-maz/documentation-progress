<?php 

class Home extends Controller{
    
    public function index(){
        
        $data['judul'] = 'Home';
        $data['news'] = $this->model('News_model')->getAllNews();
        $this->view('templates/header',$data);
        $this->view('home/index', $data);
        $this->view('templates/footer');
    }
}