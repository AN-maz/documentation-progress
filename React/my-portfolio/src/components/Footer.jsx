import React from 'react';
import './Footer.css';
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section">
                    <h3>Purwa Portfolio</h3>
                    <p>© 2024 Purwa. All rights reserved.</p>
                </div>


                <div className="footer-section">
                    <h4>Follow Me</h4>
                    <div className="social-icons">
                        <a href="https://instagram.com" target='_blank' rel='noreferrer' arial-label='Instagram'> <FaInstagram /></a>
                        <a href="https://linkedin.com" target='_blank' rel='noreferrer' arial-label='LinkedIn'> <FaLinkedin /></a>
                        <a href="https://github.com" target='_blank' rel='noreferrer' arial-label='GitHub'> <FaGithub /></a>
                        <a href="https://x.com" target='_blank' rel='noreferrer' arial-label='Twitter'> <FaXTwitter /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <div className="contact-item">
                        <MdEmail className="icon" />
                        <span>purwa123@gmail.com</span>
                    </div>

                    <div className="contact-item">
                        <FaWhatsapp className="icon" />
                        <a href="https://wa.me/62123445" target='_blank' rel='noneferrer'>+62 812-1212-1212</a>
                    </div>
                </div>

            </div>

        </footer>
    );
}


export default Footer;