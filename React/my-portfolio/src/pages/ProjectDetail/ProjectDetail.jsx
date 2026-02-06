import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import projects from '../../data/projects';
import styles from './ProjectDetail.module.css';

function ProjectDetail() {
    const { id } = useParams();

    const project = projects.find((p) => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className={styles.detailSection} style={{textAlign: 'center'}}>
                <h2>Project not found</h2>
                <Link to="/projects" className={styles.backLink}>Back to Projects</Link>
            </div>
        );
    }

    return (
        <section className={styles.detailSection}>
            <div className={styles.container}>
                
                {/* Tombol Kembali */}
                <Link to="/projects" className={styles.backLink}>
                    <FaArrowLeft /> Back to Projects
                </Link>

                {/* Header Judul */}
                <div className={styles.header}>
                    <h1 className={styles.title}>{project.title}</h1>
                    <div className={styles.metaInfo}>
                        <span>Frontend Development</span>
                        <span className={styles.separator}></span>
                        <span>2024</span>
                    </div>
                </div>

                {/* Banner Image */}
                <img src={project.image} alt={project.title} className={styles.bannerImage} />

                <div className={styles.contentGrid}>
                    
                    <div className={styles.mainContent}>
                        <h3>Project Overview</h3>
                        <p>{project.desc}</p>
                        
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>

                        <h3>Key Features</h3>
                        <ul>
                            <li>Responsive Design for all devices</li>
                            <li>Fast loading speeds optimized with Vite</li>
                            <li>Modern UI/UX principles applied</li>
                        </ul>
                    </div>

                    <aside className={styles.sidebar}>
                        <div className={styles.infoItem}>
                            <h4>Technologies</h4>
                            <div className={styles.techStack}>
                                {project.tech.map((t, index) => (
                                    <span key={index} className={styles.techTag}>{t}</span>
                                ))}
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <h4>Category</h4>
                            <p>Web Application</p>
                        </div>

                        {/* Tombol Action */}
                        <div className={styles.links}>
                            <a href={project.demo || "#"} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
                                Live Demo <FaExternalLinkAlt />
                            </a>
                            <a href={project.repo || "#"} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.btnOutline}`}>
                                Source Code <FaGithub />
                            </a>
                        </div>
                    </aside>

                </div>

            </div>
        </section>
    );
}

export default ProjectDetail;