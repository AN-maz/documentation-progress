import { Link } from "react-router-dom";
import projects from '../data/projects';

function Projects() {
    return (
        <>
            <h1>My Projects</h1>

            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <Link to={`/projects/${project.id}`} />
                        {project.title}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Projects;