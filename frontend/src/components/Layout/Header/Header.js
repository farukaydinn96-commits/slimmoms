import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import UserInfo from '../UserInfo/UserInfo';
import styles from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <Logo />
          {/* Masaüstü ekranlarda görünen menü */}
          <div className={styles.navWrapperDesktop}>
            {/* isLoggedIn bilgisini Navigation'a gönderiyoruz */}
            <Navigation isLoggedIn={isLoggedIn} />
          </div>
        </div>

        <div className={styles.rightSide}>
          {isLoggedIn && <UserInfo />}

          {/* Sadece mobilde ve tablette görünecek Hamburger Butonu */}
          <button
            type="button"
            className={styles.hamburgerBtn}
            onClick={toggleMenu}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>

      {/* Butona basıldığında açılan Mobil Menü */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {/* isLoggedIn bilgisini buraya da ekliyoruz */}
          <Navigation isLoggedIn={isLoggedIn} />
        </div>
      )}
    </header>
  );
};

export default Header;
