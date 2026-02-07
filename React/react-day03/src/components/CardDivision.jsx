import React from 'react';
import { Map, User } from 'lucide-react';

// Helper for consistent styling
const getDivisionStyles = (id) => {
    switch (id) {
        case 'software': return {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
            ),
            color: 'text-software-bright',
            bgColor: 'bg-software-bright',
            bgIcon: 'bg-software-bright/10',
            gradient: 'from-software-teal to-software-tosca',
            glow: 'shadow-software-bright/40',
            ring: 'ring-software-bright',
            border: 'border-software-bright/20'
        };
        case 'hardware': return {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25" />
                </svg>
            ),
            color: 'text-hardware-cyan',
            bgColor: 'bg-hardware-cyan',
            bgIcon: 'bg-hardware-cyan/10',
            gradient: 'from-hardware-royal to-hardware-cyan',
            glow: 'shadow-hardware-cyan/40',
            ring: 'ring-hardware-cyan',
            border: 'border-hardware-cyan/20'
        };
        case 'game': return {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            ),
            color: 'text-game-pink',
            bgColor: 'bg-game-pink',
            bgIcon: 'bg-game-pink/10',
            gradient: 'from-game-purple to-game-red',
            glow: 'shadow-game-pink/40',
            ring: 'ring-game-pink',
            border: 'border-game-pink/20'
        };
        default: return {};
    }
}

export default function CardDivision({ division, isActive, onToggle }) {
    const styles = getDivisionStyles(division.id);

    return (
        <div
            onClick={() => onToggle(division.id)}
            className={`
                relative p-6 rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden
                bg-white/80 backdrop-blur-sm border ${isActive ? styles.border : 'border-gray-100'}
                shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-1 group
                ${isActive ? `ring-2 ${styles.ring} ${styles.glow} z-10 scale-[1.02]` : 'hover:border-oxigen-light/30'}
            `}
        >
            {/* Background Gradient Blob */}
            <div
                className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${styles.gradient} blur-[60px] rounded-full -mr-10 -mt-10 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-10'}`}
            />

            {/* Header: Icon & Title & Kadiv Avatar */}
            <div className="flex flex-col items-center text-center mb-4 relative z-10">
                <div className="flex items-center justify-between w-full mb-6 relative">
                    {/* Kadiv Avatar / Badge */}
                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                        <img
                            src={division.kadivAvatar || "/assets/default-avatar.png"}
                            alt={division.kadiv}
                            className={`w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm`}
                        />
                        <div className="text-left">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Lead</p>
                            <p className="text-xs font-bold text-gray-800 leading-none">{division.kadiv.split(' ')[0]}</p>
                        </div>
                    </div>

                    {/* Icon */}
                    <div className={`p-3 rounded-2xl transition-all duration-300 ${styles.color} ${isActive ? styles.bgIcon : 'bg-gray-50'}`}>
                        {React.cloneElement(styles.icon, { className: "w-8 h-8" })}
                    </div>
                </div>

                <h3 className={`text-3xl font-extrabold mb-3 text-gray-900 group-hover:${styles.color} transition-colors tracking-tight`}>
                    {division.name}
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                    {division.description}
                </p>
            </div>

            {/* Expanded Content */}
            <div
                className={`
                    grid transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                    ${isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}
                `}
            >
                <div className="overflow-hidden">
                    <div className="space-y-8 border-t border-gray-100 pt-8 relative">

                        {/* Detailed Description */}
                        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 italic text-gray-600 text-sm leading-relaxed relative">
                            <span className={`absolute top-2 left-2 text-4xl leading-none opacity-20 ${styles.color}`}>"</span>
                            {division.detailedDescription}
                        </div>

                        {/* Learning Path (Roadmap) */}
                        <div>
                            <h4 className={`text-lg font-bold ${styles.color} mb-4 flex items-center gap-2`}>
                                <Map size={20} className="stroke-[2.5]" />
                                Learning Path
                            </h4>
                            <div className="relative pl-2 ml-2 space-y-6 border-l-2 border-gray-100">
                                {division.learningPath.map((item, idx) => (
                                    <div key={idx} className="relative pl-6">
                                        <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${styles.bgColor}`}></div>
                                        <p className="text-gray-700 text-sm font-medium leading-snug hover:text-gray-900 transition-colors cursor-default">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Team */}
                        <div>
                            <h4 className={`text-lg font-bold ${styles.color} mb-4 flex items-center gap-2`}>
                                <User size={20} className="stroke-[2.5]" />
                                The Team
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {division.staff.map((staff, idx) => (
                                    <span key={idx} className="bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-gray-600 text-xs font-semibold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-default">
                                        {staff}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chevron Indicator */}
            <div className={`absolute bottom-4 right-4 ${styles.color} transition-transform duration-500 ${isActive ? 'rotate-180 opacity-100' : 'opacity-50'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>
    );
}
