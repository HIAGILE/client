import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

interface IParams {
  id: string;
}

export const Process = () => {
  const { params } = useParams();
  const pathname = window.location.pathname;
  const title = pathname.slice(1).toLocaleUpperCase();
  return (
    <>
      <Helmet>
        <title>{`${title} | Hi Agile!`}</title>
      </Helmet>
    </>
  );
};
