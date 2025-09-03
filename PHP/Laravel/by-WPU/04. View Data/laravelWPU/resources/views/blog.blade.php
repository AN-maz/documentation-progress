<x-layout>

    <x-slot:title>{{ $title }}</x-slot:title>


    @foreach ($posts as $post)
        <article class="py-8 max-w-screen-md border-b ">

            <a href="/blog/{{$post['id']}}" class="hover:underline">
                <h2 class="mb-1 text-3xl tracking-tight font-bold text-gray-900"> {{ $post['title'] }} </h2>
            </a>

            <div class="text-base text-gray-500">
                <a href="#">{{ $post['author'] }}</a> | {{ $post['date'] }}
            </div>

            <p class="my-4 font-light"> {{ Str::limit($post['body'], 150) }} </p>

            <a href="/blog/{{$post['id']}}" class="font-medium text-blue-500 hover:underline">Read More &raquo;</a>
        </article>
    @endforeach


    {{-- <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Halaman Blog</h1>

    <div class="space-y-6">
        <article class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Judul 1</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis id recusandae necessitatibus quam, vitae
                facilis commodi eos dolor repellat reprehenderit quaerat libero voluptatum culpa, assumenda laboriosam
                suscipit quasi eligendi reiciendis.
            </p>
        </article>

        <article class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Judul 2</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis id recusandae necessitatibus quam, vitae
                facilis commodi eos dolor repellat reprehenderit quaerat libero voluptatum culpa, assumenda laboriosam
                suscipit quasi eligendi reiciendis.
            </p>
        </article>
    </div> --}}

    {{-- @foreach ($posts as $post)
        <article>

            <h2>{{ $post }}</h2>
            <h2>By {{ $post }}</h2>
            <p> {{ $post['body'] }}</p>
        
        </article>
    @endforeach --}}

</x-layout>
