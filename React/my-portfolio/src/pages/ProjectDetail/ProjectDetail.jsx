import { useParams } from 'react-router-dom';
import projects from '../../data/projects';

function ProjectDetail() {

    const { id } = useParams();

    const project = projects.find((p) => p.id === id);

    if (!project) {
        return <h2>Project not found</h2>
    }

    return (
        <>
        <h1>{project.title}</h1>
        <p>{project.desc}</p>
        </>
    );
}

export default ProjectDetail;