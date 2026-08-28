import { services, companyInfo } from "../data/mockData";
import Button from '../components/ui/Button'
import FeatureCard from "../components/ui/FeatureCard";

function Home({onNavigate}){
    return(
        <>
        <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-dark mb-4">
            {companyInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-dark/60 mb-8 max-w-2xl mx-auto">
            {companyInfo.tagline}
          </p>
          <Button variant="primary" onClick={() => onNavigate('about')}>
            Learn More About Us
          </Button>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-dark text-center mb-12">
          Our Programs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <FeatureCard
              key={service.id}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>
        </>
    )
}