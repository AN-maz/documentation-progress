import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { divisionData } from '../data/divisions';

export default function DivisionProjectList() {
    const { division } = useParams();

    // Normalize division string for comparison (e.g., "hardware" -> "Hardware")
    const divisionInfo = divisionData.find(d => d.id === division.toLowerCase());
    const filteredProjects = projectsData.filter(p => p.division.toLowerCase() === division.toLowerCase());

    if (!divisionInfo) {
        return (
            <div className="min-h-screen pt-32 text-center text-gray-800 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Division Not Found</h1>
                <Link to="/" className="px-6 py-2 bg-oxigen-dark text-white rounded-full hover:bg-oxigen-light transition-colors">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-oxigen-dark text-white py-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-oxigen-light/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />

                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors text-sm font-semibold uppercase tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Project {divisionInfo.name} 24</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">{divisionInfo.description}</p>
                </div>
            </div>

            {/* Project Grid */}
            <div className="container mx-auto px-6 max-w-6xl -mt-10 relative z-20">
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                to={`/projects/${division.toLowerCase()}/${project.id}`}
                                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                            >
                                <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
                                    {/* Thumbnail */}
                                    {project.thumnail ? (
                                        <img
                                            src={project.thumnail}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            <span className="text-sm font-medium">No Thumbnail</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-oxigen-dark/10 group-hover:bg-oxigen-dark/0 transition-colors" />

                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-oxigen-dark shadow-sm">
                                        {project.division}
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-oxigen-dark transition-colors">{project.title}</h4>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">{project.shortDescription}</p>

                                    <span className="text-oxigen-light font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                                        View Project
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                        <p className="text-gray-500 text-lg">No projects found for this division yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
