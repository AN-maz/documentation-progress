@extends('layouts.app')

@section('title', 'Our Blog')

@section('content')
    <div class="page-header">
        <h1>Latest Articles</h1>
        <p class="subtitle">Insights, news, and stories from our team.</p>
    </div>
    <div class="blog-grid">

        <x-card>
            <h3>Blog Post Title 1</h3>
            <p>A short excerpt of the blog post goes here. It gives a glimpse into the content...</p>
            <a href="#">Read More</a>
        </x-card>

       <x-card>
            <h3>Blog Post Title 2</h3>
            <p>A short excerpt of the blog post goes here. It gives a glimpse into the content...</p>
            <a href="#">Read More</a>
        </x-card>

        <x-card>
            <h3>Blog Post Title 3</h3>
            <p>A short excerpt of the blog post goes here. It gives a glimpse into the content...</p>
            <a href="#">Read More</a>
        </x-card>
    </div>
@endsection