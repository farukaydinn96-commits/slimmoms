import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/authOperations";
import styles from "../Header/Header.module.css";

const UserInfo = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user?.name) || "Kullanıcı";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.userInfo}>
      <span className={styles.userName}>{userName}</span>
      <div className={styles.divider}></div>
      <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
        Çıkış
      </button>
    </div>
  );
};

export default UserInfo;
