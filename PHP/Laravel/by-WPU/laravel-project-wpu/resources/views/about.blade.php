<x-layout>

    <x-slot:title>{{ $title }}</x-slot:title>

    <h1 class="text-3xl font-bold mb-6">Halaman About</h1>

    <img src="{{ asset('img/meko.jpg') }}" alt="Foto Meko" class="w-48 h-48 rounded-full object-cover shadow-lg">

    <p class="mt-4 text-gray-700 dark:text-gray-300">
        Halo, ini halaman about dengan foto saya.
    </p>
</x-layout>
