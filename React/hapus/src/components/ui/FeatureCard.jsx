export default function FeatureCard({title, desc}){

    return(
        <article className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-secondary hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-dark mb-3">{title}</h3>
            <p className="text-dark/70 leading-relaxed">{desc}</p>
        </article>
    )
}