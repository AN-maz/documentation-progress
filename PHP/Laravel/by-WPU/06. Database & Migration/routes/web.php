<?php

use App\Models\Post;
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
Route::get('/blog/{slug}', function ($slug) {

    $post = Post::find($slug);

    return view('post', ['title' => 'Single Post', 'post' => $post]);
});


Route::get('/contact', function () {
    return view('contact', ['title' => 'Contact Page']);
});


