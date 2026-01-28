<div class="flex min-h-screen bg-gray-50">
   <main class="flex-1 p-4 sm:p-6 lg:p-8 md:ml-20 lg:ml-64 transition-all duration-300 w-full">

      <div class="mb-8 pt-16 md:pt-0">
         <h1 class="text-3xl font-bold text-gray-900">Dashboard Education</h1>
         <p class="text-gray-500 mt-1">Pantau kegiatan dan publikasi materi.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

         <div class="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 flex justify-between items-center transition hover:shadow-md">
            <div>
               <p class="text-xs font-bold text-indigo-500 uppercase tracking-wide">Agenda Terbaru</p>
               <h3 class="text-3xl font-bold text-gray-800 mt-2">
                  <?= count($data['recent_agendas']); ?>
               </h3>
               <p class="text-xs text-gray-400 mt-1">Ditampilkan di dashboard</p>
            </div>
            <div class="p-4 bg-indigo-50 rounded-full text-indigo-600">
               <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
               </svg>
            </div>
         </div>

      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
         <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-lg font-bold text-gray-800">📅 Agenda Kegiatan Terbaru</h3>
            <a href="<?= BASEURL; ?>/edu/agenda" class="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition-colors">
               Lihat Semua
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
               </svg>
            </a>
         </div>

         <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
               <thead class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold tracking-wider">
                  <tr>
                     <th class="px-6 py-4 border-b">Judul Kegiatan</th>
                     <th class="px-6 py-4 border-b">Waktu Pelaksanaan</th>
                     <th class="px-6 py-4 border-b">Lokasi</th>
                     <th class="px-6 py-4 border-b text-center">Status Absen</th>
                  </tr>
               </thead>
               <tbody class="divide-y divide-gray-100 text-sm">
                  <?php if (empty($data['recent_agendas'])): ?>
                     <tr>
                        <td colspan="4" class="px-6 py-10 text-center text-gray-400 italic bg-gray-50">
                           <div class="flex flex-col items-center">
                              <svg class="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              Belum ada agenda kegiatan umum.
                           </div>
                        </td>
                     </tr>
                  <?php else: ?>
                     <?php foreach ($data['recent_agendas'] as $agenda): ?>
                        <tr class="hover:bg-gray-50 transition-colors group">
                           <td class="px-6 py-4 font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              <?= htmlspecialchars($agenda['judul']); ?>
                           </td>
                           <td class="px-6 py-4 text-gray-600">
                              <div class="flex flex-col">
                                 <span class="font-bold text-gray-800"><?= date('d M Y', strtotime($agenda['tanggal'])); ?></span>
                                 <span class="text-xs text-gray-500 flex items-center gap-1">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <?= date('H:i', strtotime($agenda['waktu_mulai'])); ?> WIB
                                 </span>
                              </div>
                           </td>
                           <td class="px-6 py-4 text-gray-600">
                              <div class="flex items-center gap-1">
                                 <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                 </svg>
                                 <?= htmlspecialchars($agenda['lokasi']); ?>
                              </div>
                           </td>
                           <td class="px-6 py-4 text-center">
                              <?php if ($agenda['status'] == 'buka'): ?>
                                 <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 shadow-sm animate-pulse">
                                    <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                    Dibuka
                                 </span>
                              <?php else: ?>
                                 <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                    Ditutup
                                 </span>
                              <?php endif; ?>
                           </td>
                        </tr>
                     <?php endforeach; ?>
                  <?php endif; ?>
               </tbody>
            </table>
         </div>
      </div>

   </main>
</div>