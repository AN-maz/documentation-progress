<?php

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
    return view('blog', [
        'title' => 'Blog',
        'posts' => [
            [
                'id' => 1,
                'slug' => 'judul-artikel-1',
                'title' => 'Judul Artikel 1',
                'date' => '1 January 2025',
                'author' => 'Purwa Guri',
                'body' => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt tempora quam cum, sit dolorem molestias nisi quo beatae at rem quia praesentium enim explicabo obcaecati nam excepturi laboriosam dignissimos aut!'
            ],
            [
                'id' => 2,
                'slug' => 'judul-artikel-1',
                'title' => 'Judul Artikel 2',
                'date' => '1 July 2025',
                'author' => 'Akane Kurogawa',
                'body' => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt tempora quam cum, sit dolorem molestias nisi quo beatae at rem quia praesentium enim explicabo obcaecati nam excepturi laboriosam dignissimos aut!'

            ]
        ]
    ]);
});

// VIEW -> mengirimkan data ke halaman SIngle post
Route::get('/blog/{slug}', function ($slug) {
    [
        $posts = [
            [
                'id' => 1,
                'slug' => 'judul-artikel-1',
                'title' => 'Judul Artikel 1',
                'date' => '1 January 2025',
                'author' => 'Purwa Guri',
                'body' => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt tempora quam cum, sit dolorem molestias nisi quo beatae at rem quia praesentium enim explicabo obcaecati nam excepturi laboriosam dignissimos aut!'
            ],
            [
                'id' => 2,
                'slug' => 'judul-artikel-2',
                'title' => 'Judul Artikel 2',
                'date' => '1 July 2025',
                'author' => 'Akane Kurogawa',
                'body' => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt tempora quam cum, sit dolorem molestias nisi quo beatae at rem quia praesentium enim explicabo obcaecati nam excepturi laboriosam dignissimos aut!'
            ]

        ]
    ];

    $post = Arr::first($posts, function ($post) use ($slug) {
        return $post['slug'] == $slug;
    });

    return view('post',['title' => 'Single Post','post' => $post]);
});


Route::get('/contact', function () {
    return view('contact', ['title' => 'Contact Page']);
});
