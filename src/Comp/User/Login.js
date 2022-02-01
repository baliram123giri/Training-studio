import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
const config = require("../../data/config.json");
export default function Login() {
  const [user, setUser] = useState({ identifier: "", password: "" });
  const [passErr, setPassErr] = useState(false);
  const [loader, setLoader] = useState(false)
  // ssession 
  const histroy = useNavigate()
 
   useEffect(()=>{
      if(localStorage.getItem("user_info")){
        histroy("/")
      }
   },[])
  //user hadlers
  const emailHandler = (e) => {
    setUser({ ...user, identifier: e.target.value });
    setPassErr(false)
  };
  const passwordHandler = (e) => {
    setUser({ ...user, password: e.target.value });
    setPassErr(false)
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoader(true)
    const result = await fetch(`${config.api_uri}api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((result) => result.json())
      .then((data) => {
          console.log(data)
          if(data.jwt){
            localStorage.setItem("user_info",JSON.stringify(data))
            histroy("/")
          }
          setLoader(false)
      
        if(data.error.name==="ValidationError"){
            setPassErr(true)
        }
      });
  };
  return (
    <div className="container b_form">
      {loader ? <Loader /> : null}
      <form
        onSubmit={loginHandler}
        className="form w-50 m-auto bg-white shadow  p-4 b_form_user"
        action={true}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            className="form-control"
            placeholder="Email"
            value={user.identifier}
            onChange={emailHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            required
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={user.password}
            onChange={passwordHandler}
          />
          <span className="text-danger">
            {passErr ? "Invalid Email or Password!" : ""}
          </span>
        </div>
        <button type="submit" className={`btn  b_btn_light_red `}>
          SIGN IN
        </button>
      </form>
    </div>
  );
}
