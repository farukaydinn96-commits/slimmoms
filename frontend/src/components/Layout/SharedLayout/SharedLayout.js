import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// Eski çalışan yolları geri getirdik
import Header from "../Header/Header";
import RightSideBar from "../RightSideBar/RightSideBar";
import Loader from "../Loader/Loader";
import styles from "./SharedLayout.module.css";

const SharedLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <>
      {isLoading && <Loader />}

      <Header />

      <div className={styles.layoutContainer}>
        <div className={styles.mainContent}>
          <Outlet />
        </div>

        {isLoggedIn && <RightSideBar />}
      </div>
    </>
  );
};

export default SharedLayout;
