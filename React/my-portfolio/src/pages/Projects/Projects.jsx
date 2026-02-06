import React from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import projects from '../../data/projects';
import styles from './Projects.module.css';

function Projects() {
    return (
        <section className={styles.projectsSection}>
            <div className={styles.container}>

                {/* Header Section */}
                <div className={styles.header}>
                    <h1>My Recent Works</h1>
                    <p>Here are some of the projects I've worked on.</p>
                </div>

                <div className={styles.projectGrid}>
                    {projects.map((project) => (
                        <div className={styles.card} key={project.id}>

                            <img
                                src={project.image}
                                alt={project.title}
                                className={styles.cardImage}
                            />

                            <div className={styles.cardContent}>
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>

                                <div className={styles.tags}>
                                    {project.tech.map((tech, index) => (
                                        <span key={index} className={styles.tag}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <Link to={`/projects/${project.id}`} className={styles.link}>
                                    View Case Study <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Projects;