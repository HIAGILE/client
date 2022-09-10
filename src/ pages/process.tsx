import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

interface IParams {
  id: string;
}

export const Process = () => {
  const params = useParams<{id:string}>();
  return (
    <div >
        <Helmet>
            <title>Process | Hi Agile!</title>
        </Helmet>
    </div>
  );
};