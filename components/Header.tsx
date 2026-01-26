'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import Image from 'next/image';


const menuData = {
    programas: {
        title: 'Programas',
        items: [
            { name: '2º Cérebro com IA', href: 'https://academialendaria.ai/2-cerebro-ia' },
            { name: 'Comunidade Lendár[IA]', href: 'https://academialendaria.ai/comunidade' },
            { name: 'Certificação Gestor de [IA]', href: 'https://academialendaria.ai/gestor' },
            { name: 'Formação Lendár[IA]', href: 'https://academialendaria.ai/formacao' },
        ],
    },
    eventos: {
        title: 'Eventos',
        items: [
            { name: 'Experiência Lendár[IA]', href: '#experiencia' },
            { name: 'Hackathon Lendário', href: '#hackathon' },
        ],
    },
    conteudos: {
        title: 'Conteúdos',
        items: [
            { name: 'YouTube Academia Lendár[IA]', href: 'https://youtube.com/@academialendaria' },
            { name: 'YouTube Alan Nicolas', href: 'https://youtube.com/@alannicolas' },
            { name: 'Newsletter Alan Nicolas', href: '#newsletter' },
        ],
    },
};

type MenuKey = keyof typeof menuData;

const Header = () => {
    const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
    const [displayedMenu, setDisplayedMenu] = useState<MenuKey | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    // Mobile menu states
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<MenuKey | null>(null);
    const [submenuAnimated, setSubmenuAnimated] = useState(false);

    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const menuItems = [
        { name: 'Home', href: 'https://academialendaria.ai/', hasSubmenu: false },
        { name: 'Programas', href: '#programas', hasSubmenu: true, key: 'programas' as MenuKey },
        { name: 'Eventos', href: '#eventos', hasSubmenu: true, key: 'eventos' as MenuKey },
        { name: 'Hubs', href: 'https://hub.lendario.ai/', hasSubmenu: false },
        { name: 'Parcerias', href: '#parcerias', hasSubmenu: false },
        { name: 'Conteúdos', href: '#conteudos', hasSubmenu: true, key: 'conteudos' as MenuKey },
        { name: 'Depoimentos', href: '#depoimentos', hasSubmenu: false },
    ];

    const handleMouseEnter = (key: MenuKey) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsClosing(false);
        setActiveMenu(key);
        setDisplayedMenu(key);
    };

    const handleMouseLeave = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }

        setIsClosing(true);
        setActiveMenu(null);

        closeTimeoutRef.current = setTimeout(() => {
            setDisplayedMenu(null);
            setIsClosing(false);
            closeTimeoutRef.current = null;
        }, 500);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setMobileSubmenuOpen(null);
    };

    const openMobileSubmenu = (key: MenuKey) => {
        setMobileSubmenuOpen(key);
        setSubmenuAnimated(false);
    };

    const closeMobileSubmenu = () => {
        setSubmenuAnimated(false);
        setMobileSubmenuOpen(null);
    };

    const closeMobileMenuCompletely = () => {
        setSubmenuAnimated(false);
        setMobileSubmenuOpen(null);
        setMobileMenuOpen(false);
    };

    // Trigger submenu animation
    useEffect(() => {
        if (mobileSubmenuOpen) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                setSubmenuAnimated(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [mobileSubmenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header className={`${styles.header} ${activeMenu ? styles.hasDropdown : ''}`} onMouseLeave={handleMouseLeave}>
                <div className={styles.container}>
                    {/* Logo */}
                    <div className={styles.logo}>
                        <Image
                            src="/logo.svg"
                            alt="Lendária Logo"
                            width={24}
                            height={24}
                            priority
                        />
                    </div>

                    {/* Desktop Menu */}
                    <nav className={styles.menu}>
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`${styles.menuItem} ${activeMenu === item.key ? styles.active : ''}`}
                                onMouseEnter={() => {
                                    if (item.hasSubmenu && item.key) {
                                        handleMouseEnter(item.key);
                                    } else {
                                        handleMouseLeave();
                                    }
                                }}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Login - Desktop */}
                    <div className={styles.headerActions}>
                        <a
                            href="https://academialendaria.curseduca.pro/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.loginButton}
                        >
                            <span>Login</span>
                            <i className="fi fi-rr-circle-user"></i>
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Menu"
                    >
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                    </button>
                </div>

                {/* Desktop Dropdown Menu */}
                <div className={`${styles.dropdown} ${activeMenu ? styles.dropdownActive : ''} ${isClosing ? styles.dropdownClosing : ''}`}>
                    {displayedMenu && menuData[displayedMenu] && (
                        <div className={styles.dropdownContent}>
                            <div className={styles.dropdownInner}>
                                <div className={styles.dropdownColumn}>
                                    <span className={styles.dropdownTitle}>
                                        {menuData[displayedMenu].title}
                                    </span>
                                    <ul className={styles.dropdownList}>
                                        {menuData[displayedMenu].items.map((item, index) => (
                                            <li key={index}>
                                                <a href={item.href} className={styles.dropdownLink}>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Desktop Backdrop overlay */}
            <div
                className={`${styles.backdrop} ${activeMenu ? styles.backdropActive : ''}`}
                style={{
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                }}
                onMouseEnter={handleMouseLeave}
            />

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                {/* Mobile Menu Header with Close Button */}
                <div className={styles.mobileMenuHeader}>
                    <button
                        className={styles.mobileCloseButton}
                        onClick={closeMobileMenuCompletely}
                        aria-label="Fechar"
                    >
                        <span className={styles.closeIcon}></span>
                        <span className={styles.closeIcon}></span>
                    </button>
                </div>

                <div className={styles.mobileMenuContent}>
                    {/* Main Menu */}
                    <nav className={styles.mobileNav}>
                        {menuItems.map((item) => (
                            item.hasSubmenu && item.key ? (
                                <button
                                    key={item.name}
                                    className={styles.mobileMenuItem}
                                    onClick={() => openMobileSubmenu(item.key!)}
                                >
                                    {item.name}
                                    <i className="fi fi-rr-angle-small-right"></i>
                                </button>
                            ) : (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={styles.mobileMenuItem}
                                    onClick={closeMobileMenuCompletely}
                                >
                                    {item.name}
                                </a>
                            )
                        ))}
                    </nav>

                    {/* Login Button - Mobile */}
                    <a
                        href="https://academialendaria.curseduca.pro/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mobileLoginButton}
                    >
                        <span>Login</span>
                        <i className="fi fi-rr-circle-user"></i>
                    </a>
                </div>
            </div>

            {/* Mobile Submenu Popup */}
            {mobileSubmenuOpen && (
                <div className={`${styles.mobileSubmenu} ${submenuAnimated ? styles.mobileSubmenuOpen : ''}`}>
                    <div className={styles.mobileSubmenuHeader}>
                        <button
                            className={styles.mobileBackButton}
                            onClick={closeMobileSubmenu}
                            aria-label="Voltar"
                        >
                            <i className="fi fi-rr-angle-small-left"></i>
                        </button>
                        <button
                            className={styles.mobileCloseButton}
                            onClick={closeMobileMenuCompletely}
                            aria-label="Fechar"
                        >
                            <span className={styles.closeIcon}></span>
                            <span className={styles.closeIcon}></span>
                        </button>
                    </div>
                    <div className={styles.mobileSubmenuContent}>
                        <h3 className={styles.mobileSubmenuTitle}>
                            {menuData[mobileSubmenuOpen].title}
                        </h3>
                        <nav className={styles.mobileSubmenuNav}>
                            {menuData[mobileSubmenuOpen].items.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className={styles.mobileSubmenuItem}
                                    onClick={closeMobileMenuCompletely}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
