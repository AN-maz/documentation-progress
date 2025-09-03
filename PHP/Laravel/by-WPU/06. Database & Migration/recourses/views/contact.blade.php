<x-layout>
    <x-slot:title>{{ $title }}</x-slot:title>

    <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Halaman Contact</h1>

    <ul class="space-y-4">
        <li>
            <a href="https://instagram.com" target="_blank"
               class="flex items-center gap-2 text-pink-600 dark:text-pink-400 hover:underline">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path
                        d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5Zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5A4.25 4.25 0 0 1 16.25 20.5h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5Zm9.75 2.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"/>
                </svg>
                Instagram
            </a>
        </li>

        <li>
            <a href="https://x.com" target="_blank"
               class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path
                        d="M17.216 2h3.451l-7.546 8.622L22 22h-6.825l-5.358-7.115L3.65 22H.194l8.062-9.204L.049 2h6.98l4.842 6.397L17.216 2Zm-1.204 17h1.913L7.083 4h-2.05l10.979 15Z"/>
                </svg>
                X (Twitter)
            </a>
        </li>

        <li>
            <a href="https://youtube.com" target="_blank"
               class="flex items-center gap-2 text-red-600 dark:text-red-400 hover:underline">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path
                        d="M21.6 7.2c-.2-.8-.8-1.5-1.6-1.7C18.2 5 12 5 12 5s-6.2 0-8 .5c-.8.2-1.4.9-1.6 1.7C2 9 2 12 2 12s0 3 .4 4.8c.2.8.8 1.5 1.6 1.7 1.8.5 8 .5 8 .5s6.2 0 8-.5c.8-.2 1.4-.9 1.6-1.7.4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 9.8l5.2 2.2L10 14.2V9.8Z"/>
                </svg>
                YouTube
            </a>
        </li>
    </ul>
</x-layout>
