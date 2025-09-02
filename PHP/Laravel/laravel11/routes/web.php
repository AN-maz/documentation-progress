<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::get('/about', function () {
    return view('about',['nama' => 'Purwa Kurogawa']);
});
// Route untuk Blog Page
Route::get('/blog', function () {
    return view('blog');
});

// Route untuk Contact Page
Route::get('/contact', function () {
    return view('contact');
});