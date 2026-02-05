import React from 'react';
import styles from './Footer.module.css';
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>

                <div className={styles.footerSection}>
                    <h3>Purwa Portfolio</h3>
                    <p>© 2024 Purwa. All rights reserved.</p>
                </div>


                <div className={styles.footerSection}>
                    <h4>Follow Me</h4>
                    <div className={styles.socialIcons}>
                        <a href="https://instagram.com" target='_blank' rel='noreferrer' arial-label='Instagram'> <FaInstagram /></a>
                        <a href="https://linkedin.com" target='_blank' rel='noreferrer' arial-label='LinkedIn'> <FaLinkedin /></a>
                        <a href="https://github.com" target='_blank' rel='noreferrer' arial-label='GitHub'> <FaGithub /></a>
                        <a href="https://x.com" target='_blank' rel='noreferrer' arial-label='Twitter'> <FaXTwitter /></a>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <h4>Contact Info</h4>
                    <div className={styles.contactItem}>
                        <MdEmail className={styles.icon} />
                        <span>purwa123@gmail.com</span>
                    </div>

                    <div className={styles.contactItem}>
                        <FaWhatsapp className={styles.icon} />
                        <a href="https://wa.me/62123445" target='_blank' rel='noneferrer'>+62 812-1212-1212</a>
                    </div>
                </div>

            </div>

        </footer>
    );
}


export default Footer;