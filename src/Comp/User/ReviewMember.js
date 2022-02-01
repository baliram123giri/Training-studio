import React from "react";
import { useState } from "react/cjs/react.development";

 const ReviewMember = () => {
 const [ prvie, setPrevie] = useState("")
  const PreviewImage = (event) =>{  
         var file = event.target.files[0];
        console.log(URL.createObjectURL(file))
        setPrevie(URL.createObjectURL(file))
    } 
  return (
    <div className="container user_review">
    <h3 className="b_headimg3 text-dark">You're Almost Done!</h3>
    <p className="my-3">
        Review submit the form below to complete your Fitness Blender profile.
    </p>
    <form action="">
      <div className="row ">
         <div className="col-12 col-md-6">
              <div className="user_preview">
                  
                    <h4 className="b_heading4">Review Your Member Profile Details</h4>
                    <div className="details_box my-3 my-md-4">
                        <div className="form-group">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" className="form-control w-75"   />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" className="form-control w-75"   />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lname">Email</label>
                            <input type="email" className="form-control w-75"   />
                        </div>
                        <div className="form-group">
                            <label htmlFor="week">Start Week On</label>
                            <select className="form-control w-75" id="week">
                                <option>Sunday</option>
                                <option>Monday</option>
                            </select>
                        </div>
                    </div>
              </div>
          </div>
          <div className="col-12 col-md-4">
            <p className="my-3 text-left">
                Member Profile Image
            </p>
            <div className="profile_img shadow d-flex justify-content-center p-1 my-2 ">
            <img src={prvie} className="img-fluid img-rounded" alt="imgtr"/> 
            </div>
            <input type='file' accept='image/*' onChange={PreviewImage} />
          </div>
           <div className="col-12 col-md-6">
           <div className="form-group">
                <button className="btn b_btn_light_red">CREATE ACCOUNT</button>
            </div>
           </div>
      </div>
    </form>
    </div>
  );
}


export default ReviewMember