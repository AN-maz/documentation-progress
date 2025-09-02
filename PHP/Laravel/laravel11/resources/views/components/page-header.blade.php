@props(['title', 'subtitle' => ''])

<div class="page-header">
    <h1>{{ $title }}</h1> {{-- <--- PERBAIKI SEPERTI INI --}}
    @if($subtitle)
        <p class="subtitle">{{ $subtitle }}</p>
    @endif
</div>