import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from './apollo';
import { LoggedInRouter } from './router/logged-in-router';
import { LoggedOutRouter } from './router/logged-out-router';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <>
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
      <Toaster />
    </>
  );
};
