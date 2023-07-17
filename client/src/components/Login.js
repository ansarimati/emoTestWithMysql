import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const naviaget = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        fetch("/auth/login", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                email, password
            }) 
        })
        .then((res)=> res.json())
        .then((data)=>{
            // console.log("data", data);
            if(data.token) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                naviaget("/")
            } else {
                alert("invalid credenials")
            }
        })
    }

  return (
    <div>
        <h1>Welcome</h1>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
            <label htmlFor='email'>Email </label>
            <input type='email' id="email"  onChange={(e)=> setEmail(e.target.value)} />

            <label>Password </label>
            <input type='password' id="password" onChange={(e)=> setPassword(e.target.value)} />

            <div>
            <button type='submit'>Login</button>
            </div>
        </form>

        <div>
            <Link to={"/register"}>Go To Registeration Page</Link>
        </div>
    </div>
  )
}
