<section class="pt-32 pb-20 bg-ec-blue text-white relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

    <div class="max-w-7xl mx-auto px-6 text-center relative z-10">
        <a href="<?= BASEURL; ?>/about" class="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Structure
        </a>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4"><?= $data['division']['name']; ?></h1>
        <p class="text-xl text-gray-200 max-w-2xl mx-auto"><?= $data['division']['desc']; ?></p>
    </div>
</section>

<?php if(isset($data['division']['group_photo']) && $data['division']['group_photo']): ?>
<section class="py-12 bg-gray-50">
    <div class="max-w-5xl mx-auto px-6">
        <div class="rounded-2xl overflow-hidden shadow-2xl">
            <img src="<?= BASEURL; ?>/images/pengurus/<?= $data['division']['group_photo']; ?>" 
                 alt="<?= $data['division']['name']; ?> Group Photo" 
                 class="w-full h-auto object-cover">
        </div>
    </div>
</section>
<?php endif; ?>

<div class="max-w-7xl mx-auto px-6 md:px-12 py-16">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

        <div class="lg:col-span-1">
            <div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-ec-red sticky top-32">
                <h3 class="text-2xl font-bold text-ec-blue mb-6">Program Kerja</h3>
                <ul class="space-y-4">
                    <?php foreach ($data['division']['proker'] as $proker) : ?>
                        <li class="flex items-start">
                            <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-gray-700 font-medium"><?= $proker; ?></span>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>

        <div class="lg:col-span-2">
            <div class="flex items-center justify-between mb-8 border-b pb-4">
                <h3 class="text-2xl font-bold text-ec-blue">Meet the Team</h3>
                <span class="bg-blue-100 text-ec-blue text-xs font-bold px-3 py-1 rounded-full">
                    <?= count($data['division']['members']); ?> Members
                </span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">

                <?php foreach ($data['division']['members'] as $member) : ?>
                    <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">

                        <div class="relative w-full aspect-[3/4] overflow-hidden bg-gray-200">
                            <img src="<?= BASEURL; ?>/images/pengurus/<?= $data['division']['folder']; ?>/<?= $member['img']; ?>"
                                alt="<?= $member['name']; ?>"
                                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105">

                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        <div class="p-4 text-center">
                            <h4 class="text-lg font-bold text-ec-blue leading-tight mb-1 group-hover:text-ec-red transition-colors">
                                <?= $member['name']; ?>
                            </h4>
                            <p class="text-xs font-bold text-ec-red uppercase tracking-wider mb-2">
                                <?= $member['role']; ?>
                            </p>
                            <div class="w-8 h-1 bg-gray-100 mx-auto rounded-full mb-2"></div>
                            <p class="text-gray-500 text-xs">
                                <?= $member['major']; ?>
                            </p>
                        </div>
                    </div>
                <?php endforeach; ?>

            </div>
        </div>

    </div>
</div>
