import styles from './Home.module.css';

function Home() {
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

                <h2>My Skills</h2>
                <div className={styles.skillGrid}>
                    <div className={styles.skillItem}>HTML</div>
                    <div className={styles.skillItem}>CSS</div>
                    <div className={styles.skillItem}>JavaScript</div>
                    <div className={styles.skillItem}>React</div>
                    <div className={styles.skillItem}>GIT</div>
                    <div className={styles.skillItem}>API</div>
                </div>
            </section>

        </>
    );
}

export default Home;