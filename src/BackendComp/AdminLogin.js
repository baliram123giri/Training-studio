import React from "react";

export default function AdminLogin() {
  return (
    <div className="container">
      <div className="row align-items-center bg-white shadow my-3 my-md-5">
        <div className="col-12 col-md-6">
          <div className="login_img">
            <img src="img/login/admin.png" className="img-fluid" alt="sdsf" />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <form action="" className="p-4">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className=" b_btn_light_red btn">
              SIGNIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
