import React from 'react';
import { Target, Rocket, Users, Lightbulb } from 'lucide-react';

const missions = [
  {
    id: 1,
    icon: <Rocket size={24} />,
    title: 'Skill Development',
    desc: 'Menyelenggarakan pelatihan intensif di bidang Software, Hardware, dan Game Development berbasis industri.',
    color: 'group-hover:border-software-bright',
    iconBg: 'bg-software-teal/10 text-software-teal'
  },
  {
    id: 2,
    icon: <Lightbulb size={24} />,
    title: 'Innovation Center',
    desc: 'Menjadi wadah inkubasi ide kreatif mahasiswa untuk menciptakan solusi teknologi tepat guna.',
    color: 'group-hover:border-hardware-cyan',
    iconBg: 'bg-hardware-royal/10 text-hardware-royal'
  },
  {
    id: 3,
    icon: <Users size={24} />,
    title: 'Collaboration',
    desc: 'Membangun jejaring profesional antara mahasiswa, alumni, dan praktisi industri teknologi.',
    color: 'group-hover:border-game-red',
    iconBg: 'bg-game-purple/10 text-game-purple'
  },
  {
    id: 4,
    icon: <Target size={24} />,
    title: 'Global Competitiveness',
    desc: 'Mencetak talenta digital yang siap bersaing dalam kompetisi dan pasar kerja taraf nasional maupun global.',
    color: 'group-hover:border-oxigen-light',
    iconBg: 'bg-oxigen-light/10 text-oxigen-light'
  }
];

const VisionMission = () => {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* Background Decoration (Abstrak Halus) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-oxigen-light/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-oxigen-dark/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* KOLOM KIRI: VISI (Sticky di Desktop agar tetap terlihat saat scroll misi) */}
          <div className="lg:sticky lg:top-32 self-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-oxigen-light animate-pulse"></span>
              <span className="text-xs font-bold text-oxigen-dark tracking-widest uppercase">Our Vision</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-oxigen-dark leading-tight mb-6">
              Menjadi Pusat <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxigen-light to-software-tosca">
                Ekselen Teknologi
              </span> <br/>
              Mahasiswa.
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              "Mewujudkan UKM OXIGEN sebagai ekosistem digital yang melahirkan inovator muda, teknopreneur, dan pemimpin masa depan di era 5.0."
            </p>

            {/* Quote Decoration */}
            <div className="hidden lg:block h-1 w-24 bg-gradient-to-r from-oxigen-light to-transparent rounded-full"></div>
          </div>

          {/* KOLOM KANAN: MISI (Grid Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {missions.map((item, index) => (
              <div 
                key={item.id}
                className={`group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-transparent ${item.color}`}
              >
                {/* Icon Box */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${item.iconBg}`}>
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-oxigen-dark transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionMission;