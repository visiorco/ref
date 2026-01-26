'use client';
import { useState } from 'react';
import styles from './Navbar.module.css';

const menuData = {
  programas: {
    title: 'Programas',
    items: [
      { name: '2º Cérebro com IA', href: '#segundo-cerebro' },
      { name: 'Comunidade Lendár[IA]', href: '#comunidade' },
      { name: 'Certificação Gestor de [IA]', href: '#certificacao' },
      { name: 'Formação Lendár[IA]', href: '#formacao' },
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

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <>
      <nav className={styles.navbar} onMouseLeave={handleMouseLeave}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="/logo.svg" alt="Lendária Logo" className={styles.logoImg} />
          </div>

          <ul className={styles.navLinks}>
            <li><a href="#home">Home</a></li>
            <li
              onMouseEnter={() => handleMouseEnter('programas')}
              className={activeMenu === 'programas' ? styles.active : ''}
            >
              <a href="#programas">Programas</a>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter('eventos')}
              className={activeMenu === 'eventos' ? styles.active : ''}
            >
              <a href="#eventos">Eventos</a>
            </li>
            <li><a href="#hubs">Hubs</a></li>
            <li><a href="#parcerias">Parcerias</a></li>
            <li
              onMouseEnter={() => handleMouseEnter('conteudos')}
              className={activeMenu === 'conteudos' ? styles.active : ''}
            >
              <a href="#conteudos">Conteúdos</a>
            </li>
            <li><a href="#depoimentos">Depoimentos</a></li>
          </ul>

          <div className={styles.actions}>
            <button className={styles.loginBtn}>Login</button>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`${styles.dropdown} ${activeMenu ? styles.dropdownActive : ''}`}
        >
          {activeMenu && menuData[activeMenu as keyof typeof menuData] && (
            <div className={styles.dropdownContent}>
              <div className={styles.dropdownInner}>
                <div className={styles.dropdownColumn}>
                  <span className={styles.dropdownTitle}>
                    {menuData[activeMenu as keyof typeof menuData].title}
                  </span>
                  <ul className={styles.dropdownList}>
                    {menuData[activeMenu as keyof typeof menuData].items.map((item, index) => (
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
      </nav>

      {/* Backdrop overlay */}
      <div
        className={`${styles.backdrop} ${activeMenu ? styles.backdropActive : ''}`}
        onMouseEnter={handleMouseLeave}
      />
    </>
  );
};

export default Navbar;
