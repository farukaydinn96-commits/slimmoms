import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ isLoggedIn }) => {
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
            DIARY
          </NavLink>

          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            CALCULATOR
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
            LOG IN
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            REGISTRATION
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
