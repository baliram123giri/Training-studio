import { addDays, set } from "date-fns";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Appointment() {
  // states
  const [startDate, setStartDate] = useState(new Date());
  const [availibity, setAvailibity] = useState("");
  const [timeShow, setTimeShow] = useState({ status: false, time: "" });
  const [alertBox, setAlertBox] = useState(false);
  const histroy = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      histroy("/signin");
    }
    result();
  }, [histroy]);

  //availibity ckecking
  const result = async () => {
    try {
      const avail = await (
        await axios.get("http://localhost:1337/api/appointment-avilables")
      ).data;
      avail.data.forEach((element) => {
        setAvailibity(element);
      });
    } catch (error) {
      console.log(error);
    }
  };
  var currDate = String(startDate).split(" ").slice(2, 4);
  //days start
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //timing array
  const appointTime = [
    { id: "1", time: "09.00" },
    { id: "2", time: "10.00" },
    { id: "3", time: "11.00" },
    { id: "4", time: "12.00" },
    { id: "5", time: "14.00" },
    { id: "6", time: "15.00" },
    { id: "7", time: "16.00" },
    { id: "8", time: "17.00" },
  ];

  //days end
  //Date Fixing
  var Month = startDate.getMonth() + 1;
  Month = Month < 10 ? "0" + Month : Month;
  var selecDate = startDate.getDate();
  selecDate = selecDate < 10 ? "0" + selecDate : selecDate;

  //leftdays
  var leftDays = "";
  //message
  var message = { status: false, msg: "" };
  if (availibity !== "") {
    var endDate = availibity.attributes.end_date
      .replace(/-/g, " ")
      .split(" ")
      .join("");
    endDate = Number(endDate);
    //end date end
    var startdate = availibity.attributes.startdate
      .replace(/-/g, " ")
      .split(" ")
      .join("");
    startdate = Number(startdate);
    //startDate end
    var holidayDate = availibity.attributes.holiday_date
      .replace(/-/g, " ")
      .split(" ")
      .join("");
    holidayDate = Number(holidayDate);
    //holidayDate end
    leftDays = Math.abs(startdate - endDate);
    leftDays = Math.floor(leftDays);

    var presentDate = startDate.getFullYear() + " " + Month + " " + selecDate;
    presentDate = presentDate.split(" ").join("");
    presentDate = Number(presentDate);
    //PresentDate end

    if (presentDate <= endDate && presentDate >= startdate) {
      if (startDate.getDay() === 0 || startDate.getDay() === 6) {
        // alert("Weekend Off!");
        message = {
          ...message,
          status: true,
          msg: "Weekend Off!",
        };
        if (
          holidayDate === presentDate &&
          availibity.attributes.availibity === false
        ) {
          message = {
            ...message,
            status: true,
            msg: availibity.attributes.holiday + " holiday...",
          };
        }
      }
    } else {
      // alert("Please Select Upcomming Dates!");
      message = {
        ...message,
        status: true,
        msg: "Please Select Upcomming Dates!",
      };
    }
  }

  //time handler
  const slectTimeHandler = (e) => {
    const colorTagret = e.target;
    setAlertBox(false);
    e.preventDefault();
    setTimeShow({ ...timeShow, status: true, time: colorTagret.innerHTML });
  };

  //Appointment booking Start
  //   "data":{
  //     "Date": "2022-02-02",
  //    "Name": "Sachin2 Giri",
  //     "mobile": "8208892271",
  //     "email": "giri71401@gmail.com",
  //     "appointment_time": "15:00:00:000"
  //  }
  var appointment = {
    Date: "",
    Name: "",
    mobile: "",
    email: "",
    appointment_time: "",
  };
  const bookHandler = (e) => {
    e.preventDefault();
    var userinfo = JSON.parse(localStorage.getItem("user_info"));
    userinfo = userinfo.user;
    var presentDate = startDate.getFullYear() + "-" + Month + "-" + selecDate;
    var appointTime = timeShow.time + ":00" + ":000";
    appointTime = appointTime.replace(".", ":");

    if (appointTime.length !== 12) {
      setAlertBox(true);
    
    } else {
      setAlertBox(false);
      var data = {
       "data":{
        ...appointment,
        Date: presentDate,
        Name: userinfo.username,
        mobile: userinfo.mobile,
        email: userinfo.email,
        appointment_time:appointTime
      }
      } 
       fetch(`http://localhost:1337/api/appointments`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        }
       ).then(res=>res.json())
       .then(resData=>console.log(resData))
       .catch(error=>console.log(error))
    }
 
  };
  return (
    <div className="container b_form">
      <form action="" className="shadow w-75 p-4 mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            {(alertBox === true) && (message.status === false) ? (
              <div class="alert alert-danger py-1" role="alert">
                <i className="fas fa-exclamation-circle mx-1"></i> Please Select
                time!
              </div>
            ) : (
              ""
            )}
            <div className="time_box">
              {message.status === false && (
                <span className="date_picked d-block mb-md-3 mb-2">
                  <i class="fas fa-calendar-alt mx-1"></i>{" "}
                  {days[startDate.getDay()]} {currDate[0] + " " + currDate[1]}
                  {timeShow.status === true && (
                    <>
                      <i class="fas fa-clock mx-1"></i> {timeShow.time}{" "}
                      {Number(timeShow.time) < 12 ? "AM" : "PM"}
                    </>
                  )}
                </span>
              )}
              {message.status === true ? (
                <div className="date_not_avail ">
                  <img
                    src="img/error/Calendar-cuate.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              ) : (
                <>
                  {message.status === false &&
                    appointTime.map((butt) => {
                      return (
                        <div key={butt.id} className="d-inline-block">
                          <button
                            onClick={slectTimeHandler}
                            className={`btn  time_btn m-2 btn_select`}
                          >
                            {butt.time}
                          </button>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="appoint">Appointment Date</label>
            <Calendar
              date={startDate}
              color={"#ed563b"}
              onChange={setStartDate}
              maxDate={addDays(new Date(), leftDays !== "" ? leftDays-1 : 1)}
            />
          </div>
        </div>
        {message.status === true && (
          <span className="booking_warning d-block ">
            <i className="fas fa-exclamation-circle mx-1"></i>
            {message.msg}
            {/* 11:30 on Monday,
            February , 2022 has been selected is unavailable. Please select
            another slot. */}
          </span>
        )}
        <button
          onClick={bookHandler}
          disabled={message.status === true}
          className="b_btn_light_red btn d-block m-auto my-3 px-4 btn-sm"
        >
          BOOK APPOINTMENT
        </button>
      </form>
    </div>
  );
}
