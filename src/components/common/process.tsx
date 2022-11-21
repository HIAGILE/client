import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export const Process: React.FC = () => {
  const [pathname, setPathname] = useState<string>(window.location.pathname);
  useEffect(() => {
    setPathname(pathname.slice(1).toUpperCase());
  }, []);
  console.log(window.location.pathname);

  return (
    <>
      <Helmet>
        <title>{`${pathname} | HiAgile`}</title>
      </Helmet>
    </>
  );
};
