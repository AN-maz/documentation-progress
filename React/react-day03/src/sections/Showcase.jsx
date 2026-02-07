import { Link } from 'react-router-dom';
import { showcaseContent } from '../data/projects';

export default function Showcase() {
    return (
        <section id="showcase" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-oxigen-light/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                {/* Header */}
                <div className="mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-oxigen-dark mb-6 tracking-tight">
                        {showcaseContent.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4 font-medium uppercase tracking-wide text-oxigen-light">
                        {showcaseContent.subtitle}
                    </p>
                    <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
                        {showcaseContent.description}
                    </p>
                </div>

                {/* Video Container */}
                <div className="relative max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-gray-300 border border-gray-100 bg-gray-900 mb-20">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        preload="metadata"
                        poster={showcaseContent.posterUrl}
                    >
                        <source src={showcaseContent.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Division Categories Grid */}
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-2xl font-bold text-oxigen-dark mb-10 text-center">Explore Our Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { id: 'hardware', label: 'Project Hardware 24', desc: 'Inovasi perangkat keras dan IoT karya angkatan 24.' },
                            { id: 'software', label: 'Project Software 24', desc: 'Aplikasi dan solusi digital cerdas dari angkatan 24.' },
                            { id: 'game', label: 'Project Game 24', desc: 'Pengalaman interaktif dan game seru buatan angkatan 24.' }
                        ].map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/projects/${cat.id}`}
                                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center p-8"
                            >
                                <div className="w-20 h-20 rounded-full bg-oxigen-dark/5 text-oxigen-dark flex items-center justify-center mb-6 group-hover:bg-oxigen-dark group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-3">{cat.label}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">{cat.desc}</p>
                                <span className="px-6 py-2 rounded-full border border-oxigen-dark text-oxigen-dark font-semibold text-sm group-hover:bg-oxigen-dark group-hover:text-white transition-all">
                                    Lihat Project
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
