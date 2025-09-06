<x-layout>
    <x-slot:title>{{ $title }}</x-slot:title>

    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            @foreach ($posts as $post)
                <article
                    class="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                    {{-- Category + Date --}}
                    <div class="flex items-center justify-between mb-5 text-gray-500 text-sm">
                        <a href="/categories/{{ $post->category->slug }}" class="flex items-center space-x-2">
                            <span
                                class="px-2.5 py-0.5 rounded bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 text-xs font-medium">
                                {{ $post->category->name }}
                            </span>
                            <span>{{ $post->created_at->diffForHumans() }}</span>
                        </a>
                    </div>

                    {{-- Title --}}
                    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <a href="/blog/{{ $post->slug }}" class="hover:underline">
                            {{ $post->title }}
                        </a>
                    </h2>

                    {{-- Body Preview --}}
                    <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                        {{ Str::limit($post->body, 150) }}
                    </p>

                    {{-- Author + Read More --}}
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <img class="w-8 h-8 rounded-full object-cover"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                alt="{{ $post->author->name }} avatar" />
                            <a href="/authors/{{ $post->author->username }}" class="hover:underline">
                                <span class="font-medium text-xs dark:text-white">
                                    {{ $post->author->name }}
                                </span>
                            </a>
                        </div>
                        <a href="/blog/{{ $post->slug }}"
                            class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                            Read more
                            <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1
                                    1 0 010 1.414l-6 6a1 1 0
                                    01-1.414-1.414L14.586 11H3a1 1
                                    0 110-2h11.586l-4.293-4.293a1
                                    1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </article>
            @endforeach
        </div>
    </div>
</x-layout>
