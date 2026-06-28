export const PageLayout = (contentHTML, pageNumber) => {
  // Menentukan varian layout (0, 1, atau 2) berdasarkan nomor halaman
  // Halaman 2 -> Varian 2, Halaman 3 -> Varian 0, Halaman 4 -> Varian 1, dst.
  const layoutVariant = pageNumber % 3; 

  let decorationHTML = '';

  // VARIAN 0: Ornamen Blob Biru di Kiri Atas & Titik-titik Merah di Kanan Bawah
  if (layoutVariant === 0) {
    decorationHTML = `
      <div class="absolute -top-10 -left-10 opacity-80 z-0">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="var(--color-ec-blue)">
          <path d="M45.7,-76.1C58.9,-69.3,69,-55.4,77.5,-41.3C85.9,-27.2,92.6,-13.6,90.9,-1.1C89.1,11.4,78.8,22.8,69.5,33.5C60.2,44.2,51.9,54.2,40.8,61.9C29.7,69.6,14.8,75.1,1.1,73.1C-12.5,71.2,-25.1,61.9,-37.2,53.8C-49.3,45.7,-60.9,38.8,-69.1,28.7C-77.3,18.6,-82.1,5.3,-81.4,-7.8C-80.7,-20.9,-74.5,-33.8,-64.8,-43.3C-55.1,-52.8,-42.1,-58.9,-29.6,-66.1C-17.1,-73.3,-5.1,-81.6,5.3,-91C15.7,-100.4,32.4,-82.9,45.7,-76.1Z" transform="translate(100 100) scale(1.1)" />
        </svg>
      </div>
      <div class="absolute bottom-10 right-10 opacity-30 z-0">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="20" cy="20" r="5" fill="var(--color-ec-red)"/><circle cx="50" cy="20" r="5" fill="var(--color-ec-red)"/><circle cx="80" cy="20" r="5" fill="var(--color-ec-red)"/>
          <circle cx="20" cy="50" r="5" fill="var(--color-ec-red)"/><circle cx="50" cy="50" r="5" fill="var(--color-ec-red)"/><circle cx="80" cy="50" r="5" fill="var(--color-ec-red)"/>
          <circle cx="20" cy="80" r="5" fill="var(--color-ec-red)"/><circle cx="50" cy="80" r="5" fill="var(--color-ec-red)"/><circle cx="80" cy="80" r="5" fill="var(--color-ec-red)"/>
        </svg>
      </div>
    `;
  } 
  
  // VARIAN 1: Garis Lengkung (Squiggly) Merah di Kanan Atas & Segitiga Biru Kiri Bawah
  else if (layoutVariant === 1) {
    decorationHTML = `
      <div class="absolute top-0 right-0 z-0 opacity-80">
        <svg width="250" height="150" viewBox="0 0 250 150" fill="none" stroke="var(--color-ec-red)" stroke-width="8" stroke-linecap="round">
          <path d="M250,20 Q200,60 150,20 T50,50 T-20,10" />
        </svg>
      </div>
      <div class="absolute bottom-0 left-0 z-0 opacity-80">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="var(--color-ec-blue)">
          <polygon points="0,100 100,100 0,0" />
        </svg>
      </div>
    `;
  } 
  
  // VARIAN 2: Ornamen Starburst Biru di Kanan & Garis Merah Vertikal di Kiri
  else {
    decorationHTML = `
      <div class="absolute top-1/2 -right-12 -translate-y-1/2 z-0 opacity-20">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="var(--color-ec-blue)">
           <polygon points="100,0 120,70 190,40 140,100 190,160 120,130 100,200 80,130 10,160 60,100 10,40 80,70" />
        </svg>
      </div>
      <div class="absolute top-0 left-[20px] w-[8px] h-[300px] bg-[var(--color-ec-red)] z-0"></div>
    `;
  }

  return `
    <div class="w-full max-w-[794px] h-[1123px] bg-white mx-auto relative px-[60px] py-[80px] font-['Poppins'] shadow-md mb-8 print:shadow-none print:m-0 print:border-none break-before-page overflow-hidden">
      
      <!-- Dekorasi Dinamis Dirender di Sini -->
      ${decorationHTML}

      <!-- Area Konten Utama (z-10 agar selalu di atas ornamen) -->
      <div class="h-full relative text-gray-800 z-10 flex flex-col">
        ${contentHTML}
      </div>

      <!-- Footer: Nomor Halaman (Desain Kapsul agar lebih modern) -->
      <div class="absolute bottom-[40px] right-[60px] z-20 flex items-center justify-center bg-[var(--color-ec-blue)] w-[50px] h-[50px] rounded-bl-3xl rounded-tr-3xl rounded-tl-md rounded-br-md shadow-lg border-2 border-white">
        <span class="text-white font-black text-xl">${pageNumber < 10 ? '0'+pageNumber : pageNumber}</span>
      </div>
    </div>
  `;
};