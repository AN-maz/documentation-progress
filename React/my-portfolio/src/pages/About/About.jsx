import React from 'react';
import { FaDownload } from 'react-icons/fa';
import styles from './About.module.css';

function About() {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.container}>

                {/* HERO SECTION */}
                <div className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1>Creating impact through <span className={styles.highlight}>Clean Code</span></h1>

                        <p>
                            Hi, I'm Purwa. I am a passionate Frontend Developer based in Indonesia.
                            I specialize in building modern web applications using React and JavaScript.
                            My journey started with a curiosity about how websites work, and now I transform complex problems into beautiful interfaces.
                        </p>

                        <a href="/cv-dummy.pdf" className={styles.ctaButton} download>
                            Download CV
                        </a>
                    </div>

                    <div className={styles.heroImage}>
                        <img src="/profile.png" alt="profile" />
                    </div>
                </div>

                <div className={styles.storySection}>
                    <h2>My Journey So Far</h2>
                    <p className={{ maxWidth: '700px', margin: '0 auto', color: 'var(--gray' }}>I believe in continuous learning. Here is a snapshot of my professional journey and what I have accomplished in the last few years of coding.
                    </p>

                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>2+</span>
                            <span className={styles.statLabel}>Years Learning</span>
                        </div>

                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>15+</span>
                            <span className={styles.statLabel}>Projects Completed</span>
                        </div>

                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Client Satisfaction</span>
                        </div>

                    </div>

                </div>
            </div>
        </section >
    );
}


export default About;