
import React from 'react';
import { LoggedInRouter } from '../router/logged-in-router';
import { LoggedOutRouter } from '../router/logged-out-router';


export const App = () => {

  return (
      false ? 
      <LoggedInRouter></LoggedInRouter>
      :
      <LoggedOutRouter></LoggedOutRouter>
  );
}
