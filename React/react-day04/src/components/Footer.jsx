import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-content section">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">UKMku</div>
                        <div className="footer-tag">oxigen</div>
                        <div className="instagram-logo">Instagram</div>
                    </div>
                    <div className="footer-contacts">
                        <div className="contact-item">
                            <h4>Humaniora Internal</h4>
                            <p>Contact Info...</p>
                        </div>
                        <div className="contact-item">
                            <h4>Humaniora External</h4>
                            <p>Contact Info...</p>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom text-center">
                    <p>&copy; {new Date().getFullYear()} UKMku. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
