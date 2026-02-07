import { useState } from 'react';
import { divisionData } from '../data/divisions';
import CardDivision from '../components/CardDivision';

export default function Divisions() {
    const [activeDivision, setActiveDivision] = useState(null);

    const toggleDivision = (id) => {
        if (activeDivision === id) {
            setActiveDivision(null); // Collapse if already active
        } else {
            setActiveDivision(id); // Expand clicked
        }
    };

    return (
        <section id="divisions" className="min-h-screen bg-white text-oxigen-dark py-20 px-4 md:px-10 flex flex-col items-center">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold tracking-widest text-oxigen-light uppercase mb-2">Our Departments</h2>
                <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-oxigen-dark to-oxigen-light">
                    Choose Your Path
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl items-start">
                {divisionData.map((division) => (
                    <CardDivision
                        key={division.id}
                        division={division}
                        isActive={activeDivision === division.id}
                        onToggle={toggleDivision}
                    />
                ))}
            </div>
        </section>
    );
}
