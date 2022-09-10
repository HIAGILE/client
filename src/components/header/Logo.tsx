import React  from 'react';
import {Link} from 'react-router-dom';

function Logo() {
  return(
    <Link to="/">
      <h1>Hi Agile</h1>
    </Link>
  );
}

export default Logo;