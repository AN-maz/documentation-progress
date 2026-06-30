export const PengesahanComponent = () => {
  // Komponen Helper dengan margin dan ukuran yang lebih compact
  const SignatureBlock = (
    jabatan,
    nama,
    nim,
    imgSrc,
    isCenter = false,
  ) => /*html*/ `
    <div class="flex flex-col items-center ${isCenter ? "w-full" : "w-1/2"} mb-3">
      <p class="font-bold text-[12px] text-gray-800 text-center mb-0.5 min-h-[34px] flex items-end justify-center leading-tight">${jabatan}</p>
      
      <div class="h-[75px] w-full flex items-center justify-center relative my-1">
        ${
          imgSrc
            ? `<img src="${imgSrc}" class="max-h-[85px] max-w-[130px] object-contain mix-blend-multiply grayscale opacity-90 absolute" alt="Tanda Tangan ${nama}" />`
            : `<div class="w-full h-full border-b-2 border-dashed border-gray-300"></div>`
        }
      </div>
      
      <p class="font-black text-[13px] text-gray-800 underline underline-offset-4 decoration-2">${nama}</p>
      <p class="font-medium text-[11px] text-gray-600 mt-0.5">${nim}</p>
    </div>
  `;

  return /*html*/ `
    <div class="relative w-full h-full flex flex-col pt-2 pb-6">
      
      <div class="absolute top-0 right-0 z-0 opacity-20">
        <svg width="120" height="120" viewBox="0 0 100 100">
           <path d="M 0 0 L 100 0 L 100 100 Q 50 100 0 50 Z" fill="var(--color-ec-blue)"/>
        </svg>
      </div>

      <div class="absolute bottom-[-20px] left-[-20px] z-0 opacity-30">
         <svg width="120" height="120" viewBox="0 0 100 100">
           <circle cx="0" cy="100" r="80" fill="none" stroke="var(--color-ec-red)" stroke-width="4"/>
           <circle cx="0" cy="100" r="60" fill="none" stroke="var(--color-ec-red)" stroke-width="4"/>
         </svg>
      </div>

      <div class="mb-5 relative z-10 text-center border-b-4 border-[var(--color-ec-blue)] pb-2 inline-block mx-auto">
        <h1 class="font-['Playfair_Display',_serif] text-[36px] font-black text-[var(--color-ec-blue)] m-0 tracking-wide uppercase">
          Lembar Pengesahan
        </h1>
      </div>

      <div class="relative z-10 w-[95%] mx-auto flex-1 flex flex-col justify-between">
        
        <p class="text-center text-[13px] text-gray-700 mb-2">Hormat kami,</p>

        <div class="flex justify-between w-full">
          ${SignatureBlock("Ketua Pelaksana", "Ega Silfhia", "NIM: 24552011313", "../../public/ttd-ega.jpg")}
          ${SignatureBlock("Sekretaris", "Andrian Maulana Dzikwan", "NIM: 24552011027", "../../public/purwa.png")}
        </div>

        <div class="flex justify-between w-full">
          ${SignatureBlock("Ketua Umum English Club", "Dhenia Putri Nuraini", "NIM: 24552011311", "../../public/ttd-dhenia.png")}
          ${SignatureBlock("Pembina English Club", "Titania Sari, S.S., M.Hum.", "NIDN: 0424086903", "../../public/ttd-titania.jpg")}
        </div>

        <p class="text-center text-[13px] text-gray-700 my-2">Menyetujui,</p>

        <div class="flex justify-between w-full">
          ${SignatureBlock("Kementrian Seni, Budaya, dan<br>Olahraga BEM UTB", "", "NIM: ", "../../public/ttd-azmi.jpg")}
          ${SignatureBlock("Komisi II Controlling<br>DPM UTB", "", "NIM: ", "../../public/ttd-ravi.jpg")}
        </div>

        <div class="w-full flex justify-center mt-2">
          ${SignatureBlock("Wakil Rektor Bidang Pembelajaran<br>dan Kemahasiswaan", "Dr. Rina Indrayani, S.E., M.M.", "NUPTK: 7363751652230073", "../../public/ttd-rektor.jpg", true)}
        </div>

      </div>

    </div>
  `;
};
