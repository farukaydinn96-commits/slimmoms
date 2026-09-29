import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/auth/authOperations';
import styles from './UserInfo.module.css';

const UserInfo = () => {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.auth?.user?.name);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
      className={styles.userInfo}
    >
      <span
        className={styles.userName}
        style={{
          fontSize: '14px',
          fontWeight: '700',
          color: '#212121',
          letterSpacing: '0.04em',
        }}
      >
        {userName || 'User'}
      </span>

      <div
        className={styles.divider}
        style={{ height: '32px', width: '2px', backgroundColor: '#E0E0E0' }}
      ></div>

      <button
        type="button"
        className={styles.logoutBtn}
        onClick={handleLogOut}
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: '#9B9FAA',
          fontSize: '14px',
          fontWeight: '700',
          padding: 0,
          letterSpacing: '0.04em',
        }}
      >
        Exit
      </button>
    </div>
  );
};

export default UserInfo;
