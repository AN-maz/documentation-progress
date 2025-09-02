@extends('layouts.app')

@section('title', 'Contact Us')

@section('content')
    <div class="page-header">
        <h1>Contact Us</h1>
        <p class="subtitle">We'd love to hear from you!</p>
    </div>

    <x-card>
        <form class="contact-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn">Send Message</button>
        </form>
    </x-card>

@endsection