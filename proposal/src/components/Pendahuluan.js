export const PendahuluanComponent = (data) => {
  return `
    <div class="relative w-full h-full flex flex-col pt-4">
      
      <div class="absolute top-0 right-0 opacity-100 z-0">
        <svg width="100" height="40" viewBox="0 0 100 40">
          <defs>
            <pattern id="checkers-pendahuluan" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="var(--color-ec-blue)"/>
              <rect x="10" y="10" width="10" height="10" fill="var(--color-ec-blue)"/>
            </pattern>
          </defs>
          <rect width="100" height="40" fill="url(#checkers-pendahuluan)"/>
        </svg>
      </div>

      <div class="absolute -top-6 left-[60%] z-0 opacity-80">
        <svg width="40" height="40" viewBox="0 0 50 50">
          <polyline points="10,30 30,10 50,30" fill="none" stroke="var(--color-ec-blue)" stroke-width="3"/>
          <polyline points="10,40 30,20 50,40" fill="none" stroke="var(--color-ec-red)" stroke-width="3"/>
        </svg>
      </div>

      <div class="absolute top-[280px] -left-8 z-0">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <line x1="15" y1="0" x2="15" y2="30" stroke="var(--color-ec-blue)" stroke-width="2"/>
          <line x1="0" y1="15" x2="30" y2="15" stroke="var(--color-ec-red)" stroke-width="2"/>
        </svg>
      </div>

      <div class="absolute top-[180px] -right-4 z-0">
        <svg width="60" height="20" viewBox="0 0 60 20">
          <line x1="0" y1="5" x2="60" y2="5" stroke="var(--color-ec-blue)" stroke-width="2"/>
          <line x1="10" y1="15" x2="50" y2="15" stroke="var(--color-ec-red)" stroke-width="2"/>
        </svg>
      </div>

      <div class="mb-10 relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-[var(--color-ec-red)] rounded-full border-2 border-[var(--color-ec-blue)] flex items-center justify-center">
             <div class="w-3 h-[2px] bg-white transform -rotate-45"></div>
          </div>
          <span class="font-bold text-sm text-[var(--color-ec-blue)]">English Club UTB</span>
        </div>
        
        <h1 class="font-['Playfair_Display',_serif] text-[48px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          ${data.title}
        </h1>
      </div>

      <div class="relative z-10 pr-4">
        
        <div class="flex gap-4 mb-8">
          <div class="mt-1 w-6 h-6 bg-[#3498db] border-2 border-[var(--color-ec-blue)] shadow-[3px_3px_0px_0px_var(--color-ec-blue)] shrink-0"></div>
          
          <div>
            <h3 class="font-bold text-xl text-[var(--color-ec-blue)] mb-2">Latar Belakang</h3>
            <p class="text-gray-700 text-[14px] leading-relaxed text-justify">
              ${data.content}
            </p>
          </div>
        </div>

        <div class="w-[90%] mx-auto mt-10 relative bg-white border-4 border-[var(--color-ec-blue)] shadow-[12px_12px_0px_0px_var(--color-ec-red)] z-10 transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[16px_16px_0px_0px_var(--color-ec-red)]">
          <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop" alt="TOEFL Preparation" class="w-full h-[300px] object-cover grayscale hover:grayscale-0 transition duration-500">
        </div>

      </div>

      <div class="absolute bottom-10 left-20 z-0">
         <svg width="40" height="40" viewBox="0 0 50 50">
          <polyline points="30,10 10,25 30,40" fill="none" stroke="var(--color-ec-blue)" stroke-width="2"/>
          <polyline points="40,10 20,25 40,40" fill="none" stroke="var(--color-ec-blue)" stroke-width="2"/>
          <polyline points="50,10 30,25 50,40" fill="none" stroke="var(--color-ec-red)" stroke-width="2"/>
        </svg>
      </div>

      <div class="absolute bottom-16 right-10 z-0">
        <svg width="40" height="20" viewBox="0 0 40 20">
          <path d="M 0 20 A 20 20 0 0 1 40 20" fill="var(--color-ec-red)" stroke="var(--color-ec-blue)" stroke-width="2"/>
          <line x1="0" y1="20" x2="40" y2="20" stroke="var(--color-ec-blue)" stroke-width="2"/>
        </svg>
      </div>

    </div>
  `;
};