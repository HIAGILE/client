import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

interface IParams {
  id: string;
}

export const Process = () => {
  const params = useParams<{ id: string }>();
  return (
    <>
      <Helmet>
        <title>{`${params} | Hi Agile!`}</title>
      </Helmet>
    </>
  );
};
