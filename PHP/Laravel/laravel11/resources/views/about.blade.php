@extends('layouts.app')

@section('title', 'About Us')

@section('content')

    {{-- <div class="page-header">
        <h1>About Our Company</h1>
        <p class="subtitle">Learn more about who we are and what we do</p>
    </div> --}}

    <x-page-header title="About Our Company" subtitle="Learn more about who we are and what we do." />

    <x-card>
        <p>We are a passionate team dedicated to creating amazing things. Our mission is to deliver high-quality products
            that bring joy and utility to our customers. We believe in innovation, collaboration, and continuous learning.
        </p>
    </x-card>

@endsection