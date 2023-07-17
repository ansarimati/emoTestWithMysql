import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EditUser } from './EditUser';


export const Home = () => {

    const naviage = useNavigate();

    const userData = JSON.parse(localStorage.getItem("userInfo"));
    // console.log("userData",userData);
    const userInfo = userData ? userData.user[0] : null;

    console.log(userInfo);

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        naviage("/login")
    }

    const handleDelete = () => {
        fetch("user/deleteprofile", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token":  userData.token 
            },
            body: JSON.stringify({ email: userInfo.email })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    localStorage.removeItem("userInfo");
                    alert(data.message);
                    naviage("/register");
                }
            })
    }



    return (
        <div>
            <h1>Welcome {userInfo ? userInfo.name : ""} </h1>
            <p> Status : { userInfo ? userInfo.status : ""}</p>
            <div>
                <Link to={"/user/editProfile"}>Edit Profile</Link>
            </div>

            <div>
                <button onClick={handleLogout}>Log out</button>
            </div>

            <div>
                <button onClick={handleDelete}>Delete Profile</button>
            </div>
        </div>
    )
}
