<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home',['title' => 'Home Page']);
});


Route::get('/about', function () {
    return view('about',[
        'nama' => 'Purwa Guri',
        'title' => 'About Page']);
});

// BLADE TEMPLATING
Route::get('/blog', function () {
    return view('blog',['title' => 'Blog Page']);
});

Route::get('/contact', function () {
    return view('contact',['title' => 'Contact Page']);
});