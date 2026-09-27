import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../Header/Header.module.css";

const Logo = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Link to={isLoggedIn ? "/diary" : "/"} className={styles.logo}>
      <span className={styles.logoSlim}>Slim</span>
      <span className={styles.logoMom}>Mom</span>
    </Link>
  );
};

export default Logo;
