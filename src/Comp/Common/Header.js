import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
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
  return (
    <header className="header-area header-sticky bg-white px-0">
      <nav className="navbar navbar-expand-lg bg-white shadow">
        <div className="container-fluid">
          <Link to="/" className="logo text-dark">
            Training<em> Studio</em>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">
              <li className="nav-item">
                <Link to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/schedule">Schedules</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
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
                    <Link to="/signin" className="pr-0">
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
