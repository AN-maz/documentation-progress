<!DOCTYPE html>
<html lang="en" class="h-full bg-gray-100 dark:bg-gray-900">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <title>{{ $title }}</title>
</head>

<body class="h-full">

    <div class="min-h-full" x-data="{ mobileOpen: false, profileOpen: false }">
        <!-- NAVBAR -->
        <x-navbar></x-navbar>

        <!-- HEADER -->
        <x-header>{{ $title }}</x-header>

        <!-- MAIN CONTENT -->
        <main>
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <!-- Your content -->
                {{-- <div
                    class="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-6 text-gray-500 dark:text-gray-400">
                    {{ $slot }}
                </div> --}}

                <div>
                    {{ $slot }}
                </div>
            </div>
        </main>
    </div>

</body>

</html>
