import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    c_password: ""
  })

  const { name, email, gender, password, c_password } = formData;
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if( password !== c_password ) {
      return alert("Password not matched.")
    } else {
      registerUser();
    }
  }

  const registerUser = () => {

    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify( {name, email, gender, password} )
    })
      .then((res)=> res.json())
      .then((data)=>{
        console.log("data", data);
        if(data.message) {
          return alert(data.message);
        } else {
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/")
        }
      })
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name </label>
          <input 
            type='text' 
            id="name" 
            name='name'
            placeholder='Enter Name...'
            value={ name }
            onChange={handleChange} 
            required
          />
        </div>

        <div>
          <label htmlFor='email'>Email </label>
          <input 
            type='email' 
            id="email"
            name='email'
            placeholder='Enter Email...'
            value={ email }
            onChange={handleChange} 
            required          
          />
        </div>

        <div>
          <label>Gender : </label>
          
          <label htmlFor='male'>Male </label>
          <input 
            type='radio' 
            id="male" 
            name="gender" 
            value= "male"  
            onChange={handleChange} 
          />
          
          <label htmlFor='female'>Female </label>
          <input 
            type='radio' 
            id="female" 
            name='gender' 
            value= "female" 
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type='password' 
            id="passowrd"  
            name='password'
            placeholder='Enter Password'
            onChange={handleChange} 
            value={ password }
            required
            />
        </div>

        <div>
          <label htmlFor='c_password'>Confirm Password</label>
          <input 
            type='password'
            id="c_passowrd"
            name='c_password'
            placeholder='Re Enter Password...'
            onChange={handleChange}
            value={ c_password }
            required
          />
        </div>
        <button type='submit'>Register</button>
      </form>

      <div>
        <Link to={"/login"}>Go To Login Page</Link>
      </div>
    </div>
  )
}

