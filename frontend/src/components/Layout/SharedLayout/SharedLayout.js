import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  const isLoading = useSelector(state => state.auth.isLoading);

  return (
    <>
      {isLoading && <Loader />}

      <Header />

      <div className={styles.layoutContainer}>
        <div className={styles.mainContent}>
          {/* Outlet, içine girilen sayfaları (Calculator, Diary vb.) render eder */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SharedLayout;
