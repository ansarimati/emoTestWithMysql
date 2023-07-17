import React, { useEffect, useState } from 'react'

export const EditUser = () => {

  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const userInfo = userData ? userData.user[0] : null;

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    dob:"",
  })

  const [prof_pic, setProf_Pic] = useState(null); 

  useEffect(()=>{
    if(userInfo) {
      setFormData({ ...formData,
        name: userInfo ?  userInfo.name : "",
        email: userInfo ? userInfo.email : "",
        phone: userInfo ? userInfo.phone ? userInfo.phone : "" : "",
        dob: userInfo ? userInfo.dob : ""
      });
      setProf_Pic(userInfo.profile_pic);
    }
  }, []);

  

  const handleUpload = (e) => {
    setProf_Pic(e.target.files[0]);
  }

  const { name, email, phone, dob } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handledSubmit = (e) => {
    e.preventDefault();
    console.log("prof_pic", prof_pic);
    updateUserInfo();
  }

  const updateUserInfo = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("dob", dob);
    formData.append("profile_pic", prof_pic);

    fetch("/user/editprofile",{
      method: "POST",
      headers: {
        "x-auth-token":  userData.token
      },
      body: formData
    })
    .then((res)=> res.json())
    .then((data)=>{
      console.log("editedResponse", data);
      localStorage.setItem("userInfo", JSON.stringify({
        ...userData,
        user: [{
          ...userData.user[0],
          ...formData
        }] 
      }))
    })

  }

  return (
    <div>
      <h3>Edit Your Details</h3>

      <form onSubmit={handledSubmit} encType='multipart/form-data'>
        <div>
          <label>Name </label>
          <input
            type='text'
            id="name"
            name="name"
            value={name}
            placeholder={ userInfo ? userInfo.name : ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>email </label>
          <input
            type='email'
            id="email"
            name="email"
            value={email}
            placeholder={userInfo ? userInfo.email : ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phone Number </label>
          <input
            type='text'
            id="phone"
            name="phone"
            value={phone}
            placeholder={ userInfo ? userInfo.phone : "Enter Phone Number" }
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Profile Pic</label>
          <input
            type='file'
            name="profile_pic"
            id="profile_pic"
            onChange={handleUpload}
          />
        </div>

        <button type='submit'>Update Details</button>
      </form>
    </div>
  )
}
