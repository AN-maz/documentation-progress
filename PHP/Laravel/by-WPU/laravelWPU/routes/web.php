<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home', ['title' => 'Home Page']);
});


Route::get('/about', function () {
    return view('about', [
        'nama' => 'Purwa Guri',
        'title' => 'About Page'
    ]);
});


// VIEW DATA
Route::get('/blog', function () {
    return view('blog',['title' => 'Blog', 'posts' => Post::all()]);
});

// VIEW -> mengirimkan data ke halaman SIngle post
// Menggunakan Implicit Binding
Route::get('/blog/{post:slug}', function (Post $post) {

    return view('post', ['title' => 'Single Post', 'post' => $post]);
});

Route::get('/authors/{user}', function (User $user) {

    return view('blog', ['title' => 'Artikes by ' . $user->name, 'posts' => $user->posts]);
});


Route::get('/contact', function () {
    return view('contact', ['title' => 'Contact Page']);
});


