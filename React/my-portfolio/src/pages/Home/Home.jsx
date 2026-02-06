import styles from './Home.module.css';

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiVite } from "react-icons/si";

function Home() {

    const skills = [
        { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
        { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "React", icon: <FaReact />, color: "#61DAFB" },
        { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "#38B2AC" },
    ];

    
    return (
        <>
            <section className={styles.hero}>

                <div className={styles.heroLeft}>

                    <div className={styles.heroText}>
                        <h1>Hi, I'm Purwa</h1>
                        <p className={styles.subtitle}>Frontend Development | React Enthusiast</p>
                    </div>

                    <p>
                        I build modern, responsive and fast websites
                        using React and javaScript
                    </p>

                    <div className={styles.heroBtn}>
                        <a href="/projects">View Projects</a>
                        <a href="/contact" className={styles.outline}>Contact Me</a>
                    </div>

                </div>
                <div className={styles.heroImg}>
                    <img
                        src="../../public/profile.png"
                        alt="profile"
                    />
                </div>
            </section>

            <section className={styles.skills}>
                <div className={styles.container}>
                    <h2>My Tech Stack</h2>
                    <p className={styles.subtitle}>Tools I use to build seamless web experiences</p>

                    <div className={styles.skillGrid}>
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className={styles.skillItem}
                                style={{ '--hover-color': skill.color }} 
                            >
                                <div className={styles.icon} style={{ color: skill.color }}>
                                    {skill.icon}
                                </div>
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}

export default Home;