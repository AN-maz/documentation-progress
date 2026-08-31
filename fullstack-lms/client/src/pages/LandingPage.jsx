import Hero from '../components/landing/Hero'
import Why from '../components/landing/Why'
import Features from '../components/landing/Features'
import OurTeam from '../components/landing/Our-team'
import ReadyToAction from '../components/landing/ReadyToAction'

export default function LandingPage(){
    return(
        <div className="flex flex-col min-h-screen">
            <Hero/>
            <Why/>
            <Features/>
            <OurTeam/>
            <ReadyToAction/>
        </div>
    )
}