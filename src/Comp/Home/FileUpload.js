import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const config = require("../../data/config.json");

export default function FileUpload() {
  const [file, setFile] = useState("");
  const [progressPer, setProgressPer] = useState({ percent: 0 });
  const [progressBarShow, setProgressBarShow] = useState(false)
  const [imgUrl, setImgUrl] = useState(false);
  const [success,setSuccess] = useState(true)
  const histroy = useNavigate()
 
    useEffect(()=>{
      if(!localStorage.getItem("user_info")){
        histroy("/signup")
      }
   },[])

  const fileHandler = (e) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  //file submit handler
  const fileSubmitHandler = async (e) => {
    if(Error){
      toast.error('File is not selected!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    if(file.name){
      setProgressBarShow(true)
      setProgressPer({percent:0})
    }
 
    let data = new FormData();
    data.append("files", file);
    e.preventDefault();
    try {

      const result = await axios({
        method: "POST",
        url: `${config.api_uri}api/upload`,
        data,
        onUploadProgress:(progress)=>{
         setProgressPer({percent: Math.round(progress.loaded / progress.total*100)})
        }
      });
      if(result.status===200){
        setSuccess(false)
      }
    } catch (err) {
      console.log(err)
    }
  };

//toaster


  return (
    <div className="container">
      {!file.name ? <ToastContainer />:null}
      <form
        onSubmit={fileSubmitHandler}
        className="b_form w-50 mx-auto p-4 shadow bg-white text-center"
      >
        <label htmlFor="file" className={!success?"visually-hidden":""}>File Upload</label>
        <br />
        <div className={`file_upload ${!success?"border-0":""}`}>
          {imgUrl ? "" : <i className={`fas fa-cloud-upload-alt${!success?"visually-hidden":""}`}></i>}
          {imgUrl && (
            <img
              src={imgUrl}
              alt={imgUrl}
              width={"100px"}
              height={"100px"}
              className={`mx-auto rounded-circle ${!success?"visually-hidden":""}`}
            />
          )}
          {imgUrl && (
            <span className={`filename ${!success?"visually-hidden":""}`}>{file.name.slice(0, 20)}...</span>
          )}
            {!success? <i className="fas fa-check-circle text-success"></i>:""}
          {!success? <span className="filename text-success">File Uploaded Successfully!</span>:""}
          <input
            onChange={fileHandler}
            type="file"
            accept="image/*"
            className={!success?"visually-hidden":""}
          />
        </div>
        <button type="submit" className={`btn b_btn_light_red my-2 ${!success?"visually-hidden":""} `}>
          Upload File
        </button>
        { progressBarShow && <div className={`progress ${!success?"visually-hidden":""}`}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: progressPer.percent + "%" }}
            aria-valuenow={progressPer.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {progressPer.percent}%
          </div>
        </div>}
      </form>
    </div>
  );
}
