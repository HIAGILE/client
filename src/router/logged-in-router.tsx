import { NotFound } from " pages/404";
import Main from " pages/Main";
import Header from "components/header/Header";
import React from "react"
import {
    Route,
    Routes,
  } from "react-router-dom";

const clientRoutes = [
    {
        path:"/",
        component:<Main></Main>
    },
];


export const LoggedInRouter = () =>{
    return(
        <>
            <Header></Header>
            <Routes>
                {
                    clientRoutes.map((route)=>{
                        return <Route path={route.path} key={route.path}
                        element={route.component}></Route>
                    })
                }
                <Route path="*"  element={<NotFound></NotFound>}>
                </Route>
            </Routes>
        </>
    );
}