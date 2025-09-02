<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Website Modern | @yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>

    <header class="navbar">
        <div class="container">
            <a href="/" class="logo">MyBrand</a>
            <nav class="nav-links">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/blog">Blog</a>
                <a href="/contact">Contact</a>
            </nav>
            <button class="menu-toggle">☰</button>
        </div>
    </header>

    <main class="container content">
        @yield('content')
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 MyBrand. All rights reserved.</p>
        </div>
    </footer>

    <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>