import React from 'react'
import './Hero.css'

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-tagline">tech with tecnology</h1>
                <p className="hero-dummy-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="hero-buttons">
                    <button className="btn btn-primary">Join Now</button>
                    <button className="btn btn-secondary">Learn More</button>
                </div>
            </div>
        </section>
    )
}

export default Hero
