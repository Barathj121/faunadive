"use client";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Header_server({getloc}) {

    const navigate = useNavigate();
    const map = () => {
        navigate('/Map_server');
    }
    const chatbot = () => {
        navigate('/Chatbot');
    }
    const home = () => {
        navigate('/');
    }


    return (
        <div>
        <div className="flex flex-row gap-6 w-full h-[50px] bg-[#E78895]">
        <div>
        <button onClick={()=>home()} className="mt-2 ml-4 text-3xl" >Fauna Dive</button>
        </div>
        <div>
        <button onClick={()=>map()} className="mt-6 ml-12">Hotspot Map</button>
        </div>
        <div>
        <button onClick={()=>chatbot()} className="mt-6 ml-12">Chatbot</button>
        </div>
        <div className=" flex items-end">
        <button onClick={()=>getloc()} className="mt-6 ml-12 ">Update/Get Info</button>
        </div>
       
        </div>
        </div>
    );
    }

export default Header_server;