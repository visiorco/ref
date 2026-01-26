'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';
import { BrazilFlag, USAFlag, SpainFlag } from './Flags';
import styles from './LanguageSelector.module.css';

const languages = [
    { code: 'pt' as Language, name: 'Português', flag: <BrazilFlag /> },
    { code: 'en' as Language, name: 'English', flag: <USAFlag /> },
    { code: 'es' as Language, name: 'Español', flag: <SpainFlag /> },
];

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (code: Language) => {
        setLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className={styles.languageSelector} ref={dropdownRef}>
            <button
                className={styles.languageButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select language"
            >
                <span className={styles.flag}>{currentLanguage.flag}</span>
                <svg
                    className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                >
                    <path
                        d="M2.5 3.75L5 6.25L7.5 3.75"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`${styles.dropdownItem} ${language === lang.code ? styles.active : ''}`}
                            onClick={() => handleLanguageChange(lang.code)}
                        >
                            <span className={styles.flag}>{lang.flag}</span>
                            <span className={styles.langName}>{lang.name}</span>
                            {language === lang.code && (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path
                                        d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
