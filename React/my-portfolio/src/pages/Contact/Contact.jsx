import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import styles from './Contact.module.css';

function Contact() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert(`Thank you, ${formData.name}! Your message has been sent.`);
        setFormData({ name: '', email: '', message: '' }); 
    };

    return (
        <section className={styles.contactSection}>
            <div className={styles.container}>

                <div className={styles.contactInfo}>
                    <div className={styles.infoHeader}>
                        <h1>Let's Chat!</h1>
                        <p>
                            Have a project idea, a question, or just want to connect? 
                            Fill out the form and I'll get back to you as soon as possible.
                        </p>
                    </div>

                    <div className={styles.infoDetails}>
                        <div className={styles.infoItem}>
                            <FaEnvelope className={styles.icon} />
                            <span>purwa@example.com</span>
                        </div>
                        <div className={styles.infoItem}>
                            <FaPhoneAlt className={styles.icon} />
                            <span>+62 812-3456-7890</span>
                        </div>
                        <div className={styles.infoItem}>
                            <FaMapMarkerAlt className={styles.icon} />
                            <span>Purwakarta, Indonesia</span>
                        </div>
                    </div>

                    <div className={styles.socialLinks}>
                        <a href="https://github.com/username" target="_blank" rel="noreferrer" className={styles.socialIcon}><FaGithub /></a>
                        <a href="https://linkedin.com/in/username" target="_blank" rel="noreferrer" className={styles.socialIcon}><FaLinkedin /></a>
                        <a href="https://instagram.com/username" target="_blank" rel="noreferrer" className={styles.socialIcon}><FaInstagram /></a>
                    </div>
                </div>

                {/* Bagian Kanan: Formulir */}
                <div className={styles.contactForm}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Your Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className={styles.input} 
                                placeholder="Purwa Muslim" 
                                value={formData.name}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Your Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className={styles.input} 
                                placeholder="purwa@gmail.com" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                className={styles.textarea} 
                                placeholder="Tell me about your project..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Send Message <FaPaperPlane />
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}

export default Contact;