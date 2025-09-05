<?php

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
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

Route::get('/authors/{user:username}', function (User $user) {

    return view('blog', ['title' => count($user->posts) . ' Artikes by ' . $user->name, 'posts' => $user->posts]);
});

Route::get('/categories/{category:slug}', function (Category $category) {

    return view('blog', ['title' => ' Artikes in ' . $category->name, 'posts' => $category->posts]);
});


Route::get('/contact', function () {
    return view('contact', ['title' => 'Contact Page']);
});


