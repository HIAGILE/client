import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import logoWhite from '../../images/logoWhite.svg';

type LogoType = {
  className?: string;
  mode: string;
};
const Logo = ({ className, mode }: LogoType) => {
  return (
    <Link to="/" className={`flex items-center sm:mb-10 ${className}`}>
      {mode === 'login' ? (
        <img src={logo} alt="Logo" />
      ) : (
        <img src={logoWhite} alt="Logo" />
      )}
      <h2
        className={`font-medium text-xl ml-2  ${
          mode === 'login' ? 'text-darkBlue' : 'text-lightGray'
        }`}
      >
        HiAgile
      </h2>
    </Link>
  );
};

export default React.memo(Logo);
