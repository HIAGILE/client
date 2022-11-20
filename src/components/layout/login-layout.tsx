import React from 'react';
import { Process } from 'components/common/process';
import Logo from '../common/logo';
// import { ToastContainer } from 'react-toastify';

type LoginLayoutProps = {
  children: any;
  title: string;
};

const LoginLayout = ({ children, title }: LoginLayoutProps) => {
  return (
    <>
      <Process />
      <div className="flex items-center flex-col">
        <div className="w-full max-w-screen-sm px-4 pt-4">
          <Logo className="justify-end mb-16" mode="login" />
          <h3 className="ml-4 text-3xl font-bold text-darkBlue">{title}</h3>
          {children}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};
export default LoginLayout;
