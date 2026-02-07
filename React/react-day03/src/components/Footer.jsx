import { footerContent, logoConfig } from '../data/navigation';

export default function Footer() {
    return (
        <footer id="footer" className="bg-oxigen-dark text-white pt-16 pb-8 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

                    {/* Left Column: Brand & Description */}
                    <div id="membership" className="space-y-6"> {/* Added id="membership" here for scroll target */}
                        <div className="flex items-center gap-3 font-bold text-3xl tracking-tighter cursor-pointer">
                            {logoConfig.useImage ? (
                                <img src={logoConfig.imgUrl} alt={logoConfig.alt} className="h-12 w-auto" />
                            ) : (
                                <div className="w-10 h-10 bg-gradient-to-br from-oxigen-light to-blue-400 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                                    O
                                </div>
                            )}
                            <span>OXIGEN</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed max-w-sm text-sm">
                            {footerContent.description}
                        </p>

                        <div className="flex gap-4 pt-2">
                            {/* Social Icons Placeholder */}
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-oxigen-light hover:text-white transition-colors cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contacts (2 WA Numbers) */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-oxigen-light rounded-full"></div>
                            <h4 className="font-bold text-2xl tracking-tight">Contact Us</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {footerContent.contacts.map((contact, index) => (
                                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                                    <p className="text-xs text-oxigen-light uppercase tracking-widest mb-2 font-bold">{contact.label}</p>
                                    <p className="text-white font-semibold text-lg mb-1">{contact.name}</p>
                                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-green-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 5.25V4.5Z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-mono text-sm">{contact.number}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                    <p>{footerContent.copyright}</p>
                    <p>Built for the Future.</p>
                </div>
            </div>
        </footer>
    );
}
