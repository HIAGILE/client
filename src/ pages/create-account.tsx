import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import logo from '../images/logo.png';
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet-async';

interface ICreateAccountForm{
    email:string;
    password:string;
}

export const CreateAccount = ()=>{
    const {register, getValues,formState,handleSubmit,watch} = useForm<ICreateAccountForm>({
        mode:"onChange",
    });
    const navigate = useNavigate();
    const onSubmit = () =>{
        if(!false)
        {
            const {email,password} = getValues();
        }
    }
    return <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
        <Helmet>
            <title>Create Account | Hi Agile!</title>
        </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
            <img src={logo} className="w-52 mb-10" alt="logo"></img>
            <h4 className=" w-full font-medium text-left text-3xl">Welcome back</h4>
            <form  className="grid gap-3 mt-5 w-full mb-5" onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register("email",{required:"Email is required",pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                    type="email"
                    placeholder="Email" 
                    className="input transition-colors"></input>
                {
                    formState.errors.email?.type === "pattern" && (
                        <FormError errorMessage={"Please Enter a Valid Email"}></FormError>
                    )
                }
                {
                    formState.errors.email?.message && (
                        <FormError errorMessage={formState.errors.email?.message}></FormError>
                    )
                }
                
                <input 
                    {...register("password",{required:"Password is required",minLength:10})}
                    type="password"
                    placeholder="Password" 
                    className="input"></input>
                {
                    formState.errors.password?.message && (
                        <FormError errorMessage={formState.errors.password?.message}></FormError>
                    )
                }
                <Button canClick={formState.isValid} actionText={"Create Account"} loading={false}></Button>
            </form>
            <div>
                Already have an account?{" "}
                <Link to={"/"} className="text-green-600 hover:underline">Create an Account</Link>
            </div>
        </div>
    </div>
}