import { heroContent } from '../data/projects';
import Button from '../components/Button';

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center bg-white overflow-hidden pt-20">
            {/* Background Decor: Subtle Grid & Particles */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-oxigen-light/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-oxigen-dark/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
                {/* Badge */}
                <div className="inline-block mb-6 animate-fade-in-up">
                    <span className="bg-oxigen-light/10 text-oxigen-dark text-sm font-semibold px-4 py-1.5 rounded-full border border-oxigen-light/20 shadow-sm">
                        🚀 Life With Technology
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-oxigen-dark tracking-tight leading-tight mb-6 drop-shadow-sm">
                    {heroContent.tagline}
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    {heroContent.subTagline}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button
                        href="#showcase"
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto shadow-lg shadow-oxigen-dark/30 hover:shadow-xl hover:-translate-y-1"
                    >
                        {heroContent.ctaText}
                    </Button>
                    <Button
                        href="#divisions"
                        variant="secondary"
                        size="lg"
                        className="w-full sm:w-auto shadow-sm"
                    >
                        Pelajari Divisi
                    </Button>
                </div>
            </div>
        </section>
    );
}
