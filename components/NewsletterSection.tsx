'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        whatsapp: ''
    });

    const [focused, setFocused] = useState({
        fullname: false,
        email: false,
        whatsapp: false
    });

    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleSubmit = () => {
        setIsSubmitting(true);
        // We show the success message after a small delay to simulate processing
        setTimeout(() => {
            setIsSubmitted(true);
            setIsSubmitting(false);
        }, 1500);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <>
            <Head>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css' />
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-brands/css/uicons-brands.css' />
            </Head>
            <section ref={sectionRef} className={`${styles.newsletterSection} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.videoContainer}>
                    {/* Video Background */}
                    <video
                        className={styles.videoBackground}
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/abundanc-ia.mp4" type="video/mp4" />
                    </video>

                    {/* Dark Overlay */}
                    <div className={styles.overlay} />

                    {/* Content */}
                    <div className={styles.container}>
                        <div className={styles.content}>
                            {!isSubmitted ? (
                                <>
                                    <h2 className={styles.title}>
                                        <span className={styles.titleWhite}>Abundânc</span>
                                        <span className={styles.titleGray}>[IA]</span>
                                    </h2>

                                    <p className={styles.description}>
                                        Lives semanais com Alan Nicolas, vídeos novos do YouTube<br />
                                        e newsletter de IA para negócios. Grátis no seu email.
                                    </p>

                                    {/* ActiveCampaign Form with Floating Labels */}
                                    <form
                                        method="POST"
                                        action="https://academialendariaoficial.activehosted.com/proc.php"
                                        id="_form_64_"
                                        className={styles.form}
                                        target="formTarget"
                                        onSubmit={handleSubmit}
                                    >
                                        <input type="hidden" name="u" value="64" />
                                        <input type="hidden" name="f" value="64" />
                                        <input type="hidden" name="s" />
                                        <input type="hidden" name="c" value="0" />
                                        <input type="hidden" name="m" value="0" />
                                        <input type="hidden" name="act" value="sub" />
                                        <input type="hidden" name="v" value="2" />
                                        <input type="hidden" name="or" value="3de650de-35e4-4e03-8152-2b63caa4f7b9" />
                                        <input type="hidden" name="field[17]" value="" />
                                        <input type="hidden" name="field[12]" value="" />
                                        <input type="hidden" name="field[11]" value="" />
                                        <input type="hidden" name="field[14]" value="" />
                                        <input type="hidden" name="field[15]" value="" />
                                        <input type="hidden" name="field[16]" value="" />

                                        <div className={styles.inputWrapper}>
                                            {/* Nome Input */}
                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="text"
                                                    id="fullname"
                                                    name="fullname"
                                                    value={formData.fullname}
                                                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                                    onFocus={() => setFocused({ ...focused, fullname: true })}
                                                    onBlur={() => setFocused({ ...focused, fullname: false })}
                                                    className={styles.input}
                                                />
                                                <div className={`${styles.floatingLabel} ${(formData.fullname || focused.fullname) ? styles.floatingLabelActive : ''}`}>
                                                    <i className={`fi fi-rr-id-card ${styles.labelIcon}`}></i>
                                                    <span className={styles.labelText}>Nome</span>
                                                </div>
                                            </div>

                                            {/* Email Input */}
                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    onFocus={() => setFocused({ ...focused, email: true })}
                                                    onBlur={() => setFocused({ ...focused, email: false })}
                                                    required
                                                    className={styles.input}
                                                />
                                                <div className={`${styles.floatingLabel} ${(formData.email || focused.email) ? styles.floatingLabelActive : ''}`}>
                                                    <i className={`fi fi-rr-envelope-dot ${styles.labelIcon} ${styles.emailIcon}`}></i>
                                                    <div className={styles.labelGroup}>
                                                        <span className={styles.labelText}>E-mail</span>
                                                        <span className={styles.required}>*</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* WhatsApp Input */}
                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="text"
                                                    id="field[105]"
                                                    name="field[105]"
                                                    value={formData.whatsapp}
                                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                                    onFocus={() => setFocused({ ...focused, whatsapp: true })}
                                                    onBlur={() => setFocused({ ...focused, whatsapp: false })}
                                                    required
                                                    className={styles.input}
                                                />
                                                <div className={`${styles.floatingLabel} ${(formData.whatsapp || focused.whatsapp) ? styles.floatingLabelActive : ''}`}>
                                                    <i className={`fi fi-brands-whatsapp ${styles.labelIcon}`}></i>
                                                    <div className={styles.labelGroup}>
                                                        <span className={styles.labelText}>WhatsApp</span>
                                                        <span className={styles.required}>*</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                id="_form_64_submit"
                                                disabled={isSubmitting}
                                                className={styles.button}
                                            >
                                                <div>
                                                    {(isSubmitting ? 'Enviando...' : 'Cadastrar').split('').map((char, index) => (
                                                        <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
                                                    ))}
                                                </div>
                                                {!isSubmitting && (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIcon}>
                                        <i className="fi fi-rr-check"></i>
                                    </div>
                                    <h3 className={styles.successTitle}>Quase lá!</h3>
                                    <p className={styles.successText}>
                                        Sua inscrição foi realizada com sucesso.<br />
                                        Fique de olho no seu e-mail e WhatsApp!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hidden Iframe for form submission */}
                <iframe
                    name="formTarget"
                    ref={iframeRef}
                    style={{ display: 'none' }}
                />

                {/* ActiveCampaign Script */}
                <script dangerouslySetInnerHTML={{
                    __html: `
                window.cfields = {"105":"whatsapp","17":"utm_campaign","12":"utm_fonte","11":"utm_term","14":"utm_medium","15":"utm_source","16":"utm_content"};
            `}} />
            </section>
        </>
    );
}
