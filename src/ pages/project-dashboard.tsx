import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

export const ProjectDashboard = () =>{
    const params = useParams<{projectId: string}>();
    
    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>Project Dashboard | Hi Agile</title>
            </Helmet>
            <h1>{params.projectId}</h1>
        </div>
    );
}