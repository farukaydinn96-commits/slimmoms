import React from 'react';
import { Link } from 'react-router-dom';
// Klasör yapına uygun olarak ../../../ kullanıldı
import logoSvg from '../../../assets/images/logo.svg';

const Logo = () => {
  return (
    <Link
      to="/"
      style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
    >
      <img
        src={logoSvg}
        alt="Slim Mom Logo"
        style={{ height: '44px', objectFit: 'contain' }}
      />
    </Link>
  );
};

export default Logo;
