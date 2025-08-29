<?php 

class Home extends Controller{
    
    public function index(){
        
        $data['judul'] = 'Home';
        $data['nama'] = $this->model('user_model')->getUser(); // model
        $this->view('templates/header',$data);
        $this->view('home/index',$data); // model
        $this->view('templates/footer');
    }
}