import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [trigar, setTrigar] = useState(false);

  //trigarHandler

  const trigarHandler = ()=>{
    if(trigar===true){
      setTrigar(false)
    }else{
      setTrigar(true)
    }
  }
  return (
    <header className="header-area header-sticky bg-white">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link to="/" className="logo text-dark">
                Training<em> Studio</em>
              </Link>

              <ul className={`nav ${trigar?"d-block":""}`}>
                <li className="scroll-to-section">
                  <Link to="/about">About</Link>
                </li>
                <li className="scroll-to-section">
                  <Link to="/ourclasses">Classes</Link>
                </li>
                <li className="scroll-to-section">
                  <Link to="/schedule">Schedules</Link>
                </li>
                <li className="scroll-to-section">
                  <Link to="/contact">Contact</Link>
                </li>
                <li className=" ">
                  <Link to="/signup" >
                    Sign Up
                  </Link>
                </li>
              </ul>
              <a onClick={trigarHandler} className={`menu-trigger ${trigar?"active":""}`}>
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
