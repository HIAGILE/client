import React  from 'react';
import {Link, useLocation} from 'react-router-dom';

function Navigation() {
  let location = useLocation();
  console.log(location.pathname)
  return(
    <nav>
      {location.pathname=='/login' ? <Link to="/login">login</Link> : null}
    </nav>
  );
}

export default Navigation;