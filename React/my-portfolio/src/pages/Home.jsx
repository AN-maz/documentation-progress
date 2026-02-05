import './Home.css';

function Home() {
    return (
        <>
            <section className="hero">

                <div className="hero-left">

                    <div className="hero-text">
                        <h1>Hi, I'm Purwa</h1>
                        <p className='subtitle'>Frontend Development | React Enthusiast</p>
                    </div>

                    <p>
                        I build modern, responsive and fast websites
                        using React and javaScript
                    </p>

                    <div className="hero-btn">
                        <a href="/projects">View Projects</a>
                        <a href="/contact" className='Outline'>Contact Me</a>
                    </div>

                </div>
                <div className="hero-img">
                    <img
                        src="../../public/ahmad.jpeg"
                        alt="profile"
                    />
                </div>
            </section>

            <section className="skills">

                <h2>My Skills</h2>
                <div className="skill-grid">
                    <div className='skill-item'>HTML</div>
                    <div className='skill-item'>CSS</div>
                    <div className='skill-item'>JavaScript</div>
                    <div className='skill-item'>React</div>
                    <div className='skill-item'>GIT</div>
                    <div className='skill-item'>API</div>
                </div>
            </section>

        </>
    );
}

export default Home;