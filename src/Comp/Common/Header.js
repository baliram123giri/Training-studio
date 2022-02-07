import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  //mobile navabar
  const [mobileNav, setMobileNav] = useState(true)
  // const [closeNav, setCloseNav] = useState(true)

  //logouthadler
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user_info"))
  );
  const [active,setActive] = useState(false)
  const history = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    history("/signin");
  };

  //profile show handler 
  const profileHandler = ()=>{
      if(active===false){
        setActive(true)
      }else{
        setActive(false)
      }
  }
  //mobile nav handler 
  const mobileNavHandler =()=>{
    setMobileNav(false)
  }
  const closeNavHandler = ()=>{
    setMobileNav(true)
  }
  return (
    <header className="header-area header-sticky bg-white px-0">
      <nav className="navbar navbar-expand-lg bg-white shadow">
        <div className="container-fluid">
          <Link to="/" className="logo text-dark">
            Training<em> Studio</em>
          </Link>
          <button
            className="btn text-dark navbar-toggler"
            onClick={mobileNavHandler}
          >
            <i className="fas fa-bars "></i>
          </button>
          <div
            className={`${mobileNav?"":"active"} collapse navbar-collapse `}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mobile_nav ">
              <li className="nav-item">
                <Link to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/schedule">Schedules</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/appointment">Appointment</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <i onClick={closeNavHandler} className="far fa-times-circle close_nav"></i>
              {localStorage.getItem("user_info") ? (
                <>
                  <li onClick={profileHandler} className="nav-item user_dash_profile">
                    <span style={{cursor:"pointer"}}>
                      <div className="d-flex align-items-center ">
                        <i className="fas fa-user-circle mx-1 "></i>
                        {
                          <span>
                            {
                              JSON.parse(localStorage.getItem("user_info")).user
                                .username
                            }
                          </span>
                        }
                       
                      </div>
                      
                    </span>
                    <div className={`user_dash_profile_box shadow-lg rounded-bottom ${!active?"active":""}`}>
                      <ul className="navbar-nav flex-column ">
                          <li className="nav-item text-center  mx-auto w-100">
                          <Link to="/file"><i className="fas fa-file-image mx-1 "></i>File</Link>
                          </li>
                          <li className="nav-item text-center  mx-auto w-100">
                            <a onClick={logoutHandler} href="/signin"><i className="fas fa-sign-out-alt mx-1"></i> Logout</a>
                          </li>
                    </ul>

                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-3 ">
                    <Link to="/signin" className="pr-md-0">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="/signup" className="signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
