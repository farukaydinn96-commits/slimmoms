import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../Header/Header.module.css";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <nav className={styles.nav}>
      {isLoggedIn ? (
        <>
          <NavLink
            to="/diary"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            GÜNLÜK
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            HESAP MAKİNESİ
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            GİRİŞ YAP
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            KAYIT OL
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
