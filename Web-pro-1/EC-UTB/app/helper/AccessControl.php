<?php

class AccessControl{

    public static function check(){

        if(!isset($_SESSION['user_id'])){
            header('Location: ' . BASEURL . '/auth');
            exit;
        } 
    }
    public static function checkAdmin($user){

        if(!$user || $user['role'] !== 'admin' ){
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }
    }
}