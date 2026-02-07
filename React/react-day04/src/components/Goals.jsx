import React from 'react'
import './Goals.css'

const Goals = () => {
    return (
        <section className="section goals-section">
            <h2 className="section-title text-center">Our Goals</h2>
            <div className="goals-container">
                <div className="goals-left">
                    {/* Placeholder for Cabinet Photo */}
                    <div className="cabinet-photo-placeholder">
                        <span>Cabinet Photo</span>
                    </div>
                </div>
                <div className="goals-right">
                    <div className="vision">
                        <h3>Vision</h3>
                        <p>To be the leading student activity unit in fostering technological innovation and creativity.</p>
                    </div>
                    <div className="mission">
                        <h3>Mission</h3>
                        <ul>
                            <li>Conduct regular workshops and training.</li>
                            <li>Collaborate with industry experts.</li>
                            <li>Develop impactful projects for society.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Goals
