export const CoverComponent = () => {
  return /*html*/ `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@400;500;600;700&display=swap');

      :root {
        --color-ec-blue: #001452;
        --color-ec-red: #D81B2B;
      }

      @media print {
        @page {
          size: A4;
          margin: 0; 
        }
        body {
          margin: 0;
          -webkit-print-color-adjust: exact !important; 
          print-color-adjust: exact !important;         
        }
        .no-print {
          display: none !important; 
        }
      }
    </style>

    <div class="no-print flex justify-center my-4">
      <button onclick="window.print()" class="bg-[var(--color-ec-blue)] hover:opacity-90 text-white font-bold py-2 px-6 rounded shadow">
        Cetak ke PDF A4
      </button>
    </div>

    <div class="w-full max-w-[794px] h-[1123px] print:w-[210mm] print:h-[297mm] print:max-w-none print:h-screen print:shadow-none bg-white relative font-['Poppins',_sans-serif] text-[var(--color-ec-blue)] p-[60px] box-border overflow-hidden mx-auto shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-t-[15px] border-[var(--color-ec-red)]">
      
      <div class="flex items-center gap-6 mb-12">
        <div class="w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
            <img src="../../public/logo-utb.png" alt="Logo Kampus" class="w-full h-full object-contain rounded-full" />
        </div>

        <div class="w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
            <img src="../../public/bem.png" alt="Logo Kampus" class="w-full h-full object-contain rounded-full" />
        </div>

        <div class="w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
            <img src="../../public/ec.png" alt="Logo Kampus" class="w-full h-full object-contain rounded-full" />
        </div>
      </div>

      <div class="absolute top-[80px] right-[60px] opacity-20">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-ec-blue)" stroke-width="2" stroke-dasharray="5,5"/>
          <circle cx="50" cy="50" r="20" fill="var(--color-ec-red)"/>
        </svg>
      </div>

      <div class="mb-10">
        <p class="text-[var(--color-ec-red)] font-bold tracking-[0.2em] text-sm mb-2 uppercase">Proposal Kegiatan</p>
        <h1 class="font-['Playfair_Display',_serif] text-[56px] font-black leading-[1.1] m-0 mb-4 text-[var(--color-ec-blue)]">
          TOEFL<br>Preparation
        </h1>
        <h2 class="text-lg font-semibold text-gray-600 m-0 border-l-4 border-[var(--color-ec-red)] pl-4">
          English Club<br>Universitas Teknologi Bandung
        </h2>
      </div>

      <div class="relative mb-[60px] mt-8">
        <div class="absolute -top-4 -right-4 w-full h-full bg-[var(--color-ec-blue)] z-[1]"></div>
        
        <div class="relative w-full h-[380px] bg-white z-[2] border-2 border-[var(--color-ec-blue)]">
          <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop" alt="TOEFL Preparation Preparation" class="w-full h-full object-cover">
        </div>

        <div class="absolute -bottom-8 -left-8 z-[3]">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <rect x="0" y="0" width="80" height="80" fill="none" stroke="var(--color-ec-red)" stroke-width="6"/>
          </svg>
        </div>
      </div>

      <div class="flex justify-between gap-6 absolute bottom-[60px] left-[60px] right-[60px]">
        <div class="flex-1 bg-white border-l-[6px] border-[var(--color-ec-red)] p-4 shadow-sm bg-gray-50">
          <p class="m-0 mb-1 text-xs text-gray-500 uppercase font-semibold">Penyelenggara</p>
          <h3 class="m-0 text-[16px] font-bold text-[var(--color-ec-blue)] leading-tight">English Club (EC) UTB</h3>
        </div>
        
        <div class="flex-1 bg-white border-l-[6px] border-[var(--color-ec-blue)] p-4 shadow-sm bg-gray-50">
          <p class="m-0 mb-1 text-xs text-gray-500 uppercase font-semibold">Tahun Pelaksanaan</p>
          <h3 class="m-0 text-[16px] font-bold text-[var(--color-ec-blue)] leading-tight">2025</h3>
        </div>
      </div>
      
    </div>
  `;
};
