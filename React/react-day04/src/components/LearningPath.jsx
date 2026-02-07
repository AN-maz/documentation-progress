import React from 'react'
import './LearningPath.css'

const paths = [
    { id: 1, name: 'Game', description: 'Explore the world of game development and mechanics.' },
    { id: 2, name: 'Software', description: 'Master software engineering and application development.' },
    { id: 3, name: 'Hardware', description: 'Dive into hardware design, IoT, and embedded systems.' },
]

const LearningPath = () => {
    return (
        <section className="section learning-path-section">
            <h2 className="section-title text-center">Our Learning Path</h2>
            <div className="cards-container">
                {paths.map((path) => (
                    <div key={path.id} className="card">
                        <div className="card-header">{path.name}</div>
                        <div className="card-body">
                            <p>{path.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default LearningPath
