import React from "react"
import {Routes,Route } from "react-router-dom";
import { NotFound } from " pages/404";
import { Login } from " pages/login";
import { CreateAccount } from " pages/create-account";

export const LoggedOutRouter = () =>{
    return (
        <>
            <Routes>
                <Route path="/create-account" element={<CreateAccount></CreateAccount>}>
                </Route>
                <Route path="/" element={<Login></Login>}>
                </Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </>
    );
}