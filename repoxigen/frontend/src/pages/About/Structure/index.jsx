import React from 'react';
import { Shield, Sword, Scroll, Coins, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Data Dummy BPH (Badan Pengurus Harian)
const topLeaders = [
  {
    id: 1,
    role: 'Ketua Umum',
    name: 'Nama Ketua',
    nickname: 'The Commander',
    stats: { lead: 95, tech: 80, charisma: 90 },
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    color: 'from-blue-600 to-blue-400', // Oxigen Blue
    icon: <Shield size={20} />
  },
  {
    id: 2,
    role: 'Wakil Ketua',
    name: 'Nama Wakil',
    nickname: 'The Strategist',
    stats: { lead: 85, tech: 85, charisma: 92 },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    color: 'from-blue-500 to-cyan-400',
    icon: <Sword size={20} />
  }
];

const supports = [
  { role: 'Sekretaris', name: 'Nama Sekretaris', icon: <Scroll size={16} /> },
  { role: 'Bendahara', name: 'Nama Bendahara', icon: <Coins size={16} /> }
];

const Structure = () => {
  return (
    <section className="relative py-24 bg-oxigen-dark text-white overflow-hidden">
      
      {/* Background Grid & Glitch Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-software-bright font-bold tracking-[0.3em] uppercase mb-2 animate-pulse">
            System Hierarchy
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase" style={{ textShadow: '0 0 20px rgba(0,81,210,0.6)' }}>
            Organizational <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxigen-light to-software-bright">Chart</span>
          </h3>
        </div>

        {/* LEVEL 1: TOP LEADERS (Game Cards) */}
        <div className="flex flex-wrap justify-center gap-10 mb-20">
          {topLeaders.map((leader) => (
            <div key={leader.id} className="group relative w-80 perspective-1000">
              
              {/* Card Container */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transform transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_0_30px_rgba(0,81,210,0.5)]">
                
                {/* Image Area */}
                <div className="h-64 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-b ${leader.color} opacity-20 mix-blend-overlay z-10`}></div>
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur border border-white/20 px-3 py-1 rounded text-xs font-bold text-white flex items-center gap-2">
                     {leader.icon}
                     {leader.role.toUpperCase()}
                  </div>
                </div>

                {/* Stats Area */}
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-oxigen-light transition-colors">{leader.name}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">{leader.nickname}</p>

                  {/* RPG Stats Bars */}
                  <div className="space-y-3">
                    <StatBar label="Leadership" value={leader.stats.lead} color="bg-yellow-400" />
                    <StatBar label="Tech Skill" value={leader.stats.tech} color="bg-software-bright" />
                    <StatBar label="Charisma" value={leader.stats.charisma} color="bg-game-pink" />
                  </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${leader.color}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* LEVEL 2: SEKRETARIS & BENDAHARA (Mini Cards) */}
        <div className="flex justify-center gap-6 mb-24">
          {supports.map((sup, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-lg hover:bg-white/10 transition-colors">
              <div className="p-3 bg-oxigen-light/20 rounded-full text-oxigen-light">
                {sup.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">{sup.role}</p>
                <p className="text-white font-medium">{sup.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* LEVEL 3: DEPARTMENTS (Link to Detail) */}
        <div className="border-t border-white/10 pt-16">
          <div className="text-center mb-10">
            <h4 className="text-2xl font-bold text-white mb-2">Operational Units</h4>
            <p className="text-gray-400">Pilih divisi untuk melihat anggota squad.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DepartmentCard title="Humaniora" desc="Internal & External Relations" color="border-yellow-500" />
            <DepartmentCard title="Kominfo" desc="Creative & Branding" color="border-orange-500" />
            <DepartmentCard title="Kewirus" desc="Business & Finance" color="border-green-500" />
            
            {/* Special Card for Tech */}
            <Link to="/home/divisi" className="group relative bg-gradient-to-br from-oxigen-light/20 to-oxigen-dark border border-oxigen-light/50 p-6 rounded-xl hover:shadow-[0_0_20px_rgba(0,81,210,0.4)] transition-all text-center flex flex-col items-center justify-center cursor-pointer">
              <div className="absolute inset-0 bg-oxigen-light/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Users size={32} className="text-white mb-3" />
              <h5 className="text-xl font-bold text-white">Tech Divisions</h5>
              <p className="text-xs text-gray-300 mt-1">Software • Hardware • Game</p>
              <span className="mt-4 text-xs font-bold text-software-bright border border-software-bright px-3 py-1 rounded-full">View Squad</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

// Helper Components
const StatBar = ({ label, value, color }) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="w-20 text-gray-400 font-mono">{label}</span>
    <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
    <span className="text-white font-bold">{value}</span>
  </div>
);

const DepartmentCard = ({ title, desc, color }) => (
  <div className={`bg-black/20 border-l-4 ${color} p-6 rounded-r-xl hover:bg-white/5 transition-colors`}>
    <h5 className="text-lg font-bold text-white">{title}</h5>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);

export default Structure;