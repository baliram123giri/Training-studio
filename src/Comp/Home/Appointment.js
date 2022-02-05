import { addDays } from "date-fns";
import React, { useState, useEffect } from "react";
import { Calendar, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
export default function Appointment() {
  // states
  const [startDate, setStartDate] = useState(new Date());
  const histroy = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("user_info")){
      histroy("/signin")
    }
 },[])
 //user details
  var userDetails = JSON.parse(localStorage.getItem("user_info")).user.username.split(" ")

  
  // const selectionRange = {
  //   startDate: addDays(new Date(), 4),
  //   endDate: addDays(new Date(), 8),
  //   key: "selection",
  // };

  const shape = {
    	
    startDate: addDays(new Date(), 1),
    endDate: addDays(new Date(), 7),
color: "red",
  }
  var currDate = String(startDate).split(" ").slice(2, 4);

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="container b_form">
      <form action="" className="shadow w-75 p-4 mx-auto">
        <div className="row">
          <div className="col-12 col-md-6">
            <label htmlFor="Name">First Name</label>
            <input value={userDetails[0]} readOnly type="text" className="form-control" />
            <label htmlFor="Name">Last Name</label>
            <input value={userDetails[1]} readOnly type="text" className="form-control" />
            <div className="time_box">
              <span className="date_picked d-block my-md-3 my-2">
                {days[startDate.getDay()]} {currDate[0] + " " + currDate[1]}
              </span>
              <button className="btn  time_btn m-2">09:00</button>
              <button className="btn  time_btn m-2">10.00</button>
              <button className="btn  time_btn m-2">11:00</button>
              <button className="btn  time_btn m-2">12:00</button>
              <button className="btn  time_btn m-2">14:00</button>
              <button className="btn  time_btn m-2">15:00</button>
              <button className="btn  time_btn m-2">16:00</button>
              <button className="btn  time_btn m-2">17:00</button>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="appoint">Appointment</label>
            <Calendar
              date={startDate}
              color={"#ed563b"}
              onChange={setStartDate}
              preview={shape}
              maxDate={addDays(new Date(), 10)}
              
           />
          </div>
        </div>
        <span className="booking_warning d-block invisible">
          <i className="fas fa-exclamation-circle mx-1"></i>11:30 on Monday,
          February , 2022 has been selected is unavailable. Please select
          another slot.
        </span>
        <button className="b_btn_light_red btn d-block m-auto my-3 px-4 btn-sm">
          BOOK APPOINTMENT
        </button>
      </form>
    </div>
  );
}
