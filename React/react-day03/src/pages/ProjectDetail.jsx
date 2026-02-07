import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

export default function ProjectDetail() {
    const { division, id } = useParams();
    const project = projectsData.find(p => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen pt-32 text-center text-gray-800 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                <Link to="/" className="px-6 py-2 bg-oxigen-dark text-white rounded-full hover:bg-oxigen-light transition-colors">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-gray-50 pb-20">
            {/* Header / Hero for Detail */}
            <div className="bg-oxigen-dark text-white py-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-oxigen-light/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />

                <div className="container mx-auto max-w-5xl relative z-10 text-center md:text-left">
                    {/* Breadcrumbs / Back */}
                    <div className="flex items-center gap-2 mb-8 text-sm font-semibold uppercase tracking-wider text-gray-400">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link to={`/projects/${project.division.toLowerCase()}`} className="hover:text-white transition-colors">{project.division}</Link>
                        <span>/</span>
                        <span className="text-oxigen-light">{project.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-white/20 text-oxigen-light">
                                <span className="w-2 h-2 rounded-full bg-oxigen-light animate-pulse"></span>
                                {project.division} Division
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">{project.title}</h1>
                            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">{project.shortDescription}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl -mt-16 relative z-20">

                {/* 1. Video Demo Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-100">
                    <div className="bg-gray-900 aspect-video relative group">
                        <video
                            className="w-full h-full object-cover"
                            controls
                            preload="metadata"
                            poster={project.gallery && project.gallery[0] ? project.gallery[0] : ""}
                        >
                            <source src={project.videoDemoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Project Demo</span>
                        <span className="text-sm text-gray-400 italic">Play video to see it in action</span>
                    </div>
                </div>

                {/* 2. Main Content & Team */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Full Description */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100 h-fit">
                        <h2 className="text-2xl font-bold text-oxigen-dark mb-6 flex items-center gap-3">
                            Project Review
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                            {project.fullDescription}
                        </p>
                    </div>

                    {/* Right: Team Members */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 h-fit">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            The Makers
                        </h3>
                        <div className="space-y-4">
                            {project.team.map((member, index) => (
                                <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oxigen-dark to-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">
                                            {member.name} - <span className="font-normal text-oxigen-light text-sm">{member.role}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
