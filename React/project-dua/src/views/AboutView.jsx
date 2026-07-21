import { companyInfo, team } from '../data/mockData'
import ProfileCard from '../components/ui/ProfileCard'

function AboutView() {
  return (
    <>
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-dark text-center mb-6">About OXIGEN</h2>
        <p className="text-dark/70 text-lg leading-relaxed text-center mb-12">
          {companyInfo.description}
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-dark/70 leading-relaxed">{companyInfo.vision}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
            <ul className="space-y-3">
              {companyInfo.mission.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-dark/70">
                  <span className="text-secondary mt-1 shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-dark/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <ProfileCard
                key={member.id}
                name={member.name}
                role={member.role}
                photo={member.photo}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutView
