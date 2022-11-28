import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar, meVar } from './apollo';
import { LoggedInRouter } from './router/logged-in-router';
import { LoggedOutRouter } from './router/logged-out-router';
import { Toaster } from 'react-hot-toast';
import { useMe } from 'lib/useMe';
import { UserRole } from '__generated__/globalTypes';

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: myProfile, loading: myProfileLoading } = useMe();
  //const me = meVar(myProfile);

  return (
    <>
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
      <Toaster />
    </>
  );
};
