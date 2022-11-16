import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export const Process: React.FC = () => {
  const pathname = window.location.pathname;
  const title = pathname.slice(1);

  return (
    <>
      <Helmet>
        <title>{`${title} | HiAgile`}</title>
      </Helmet>
    </>
  );
};
