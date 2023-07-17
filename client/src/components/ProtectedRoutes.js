import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

export const ProtectedRouets = ({ Component }) => {

    const navigate = useNavigate();

    useEffect(()=>{
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log("userinfo", userInfo);
        if(!userInfo) {
            navigate("/login");
        } 
    }, []);

    return (
        <div>

            <Component />
        </div>
    )
}
