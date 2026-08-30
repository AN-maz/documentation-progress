import Hero from '../features/landing/Hero'
import Why from '../features/landing/Why'
import Features from '../features/landing/Features'
import OurTeam from '../features/landing/Our-team'
import ReadyToAction from '../features/landing/ReadyToAction'

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