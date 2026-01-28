<?php

class AdminController extends Controller{

    protected $user;

    public function __construct(){
        AccessControl::check();

        $this->user = $this->model('User_model')->getUserById($_SESSION['user_id']);
    }
}