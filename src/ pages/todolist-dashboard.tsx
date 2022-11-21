import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

export const ToDoListDashboard = () =>{
    const params = useParams<{projectId: string}>();
    
    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>ToDoList Dashboard | Hi Agile</title>
            </Helmet>
            <h1>{params.projectId}</h1>
            <h2>일감 대시보드</h2>
        </div>
    );
}