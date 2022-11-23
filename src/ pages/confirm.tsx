import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

export const Confirm = () =>{
    const params = useParams<{code: string}>();
    
    useEffect(() => {

    }, []);

    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>Schedule Dashboard | Hi Agile</title>
            </Helmet>
            <h2>{params.code}</h2>
        </div>
    );
}