
import React, {  useState } from 'react';
import config from "../../data/config.json"
import Loader from '../Common/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
        const [user, setUser] = useState({fname:"",lname:"",email:"",password:"",cpassword:"", monumber:""})
        const [cpassErr, setCpassErr] = useState(false)
        const [passLengthErr, setPassLengthErr] = useState(false)
        const [emailCheckErr, setEmailCheckErr] = useState(false)
        const [mobileCheckErr, setMobileCheckErr] = useState(false)
        const [loader, setLoader] = useState(false)

        // useEffect(()=>{
        // 
        // },[])
        //user data handler start
        const fnameHandler = (e)=>{
            setUser({...user,fname:e.target.value})
        }
        const lnameHandler = (e)=>{
            setUser({...user,lname:e.target.value})
        }
        const emailHandler = (e)=>{
            setUser({...user,email:e.target.value})
            setEmailCheckErr(false)
        }
        const passwordHandler = (e)=>{
            if(user.password.length >= 6){
                setUser({...user,password:e.target.value})
                setPassLengthErr(false)
               
            }else{
                setPassLengthErr(true)
                setUser({...user,password:e.target.value})
            }
        }
        const cpasswordHandler = (e)=>{
            setUser({...user,cpassword:e.target.value})
            setCpassErr(false)
        }
        const numberHandler = (e)=>{
            setUser({...user,monumber:e.target.value})
             setMobileCheckErr(false)
        }
        const signUpHandler = (e)=>{
            
            e.preventDefault()
            if(user.cpassword === user.password){
                setCpassErr(false)
                if(cpassErr===false && emailCheckErr===false && passLengthErr ===false){ 
                    var data = {username:user.fname+ " "+user.lname, email:user.email, mobile:parseInt(user.monumber),password:user.password}
                   if(user.monumber.length===10){
                    setLoader(true)
                    fetch(`${config.api_uri}api/auth/local/register`,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(data)
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        setLoader(false)
                        if(data.jwt){
                            toast.success('User Registerd Succesfully!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                });
                            setUser({...user,fname:"",lname:"",email:"",password:"",cpassword:"", monumber:""})
                        }
                        if(data.error.message==="Email is already taken"){
                            setEmailCheckErr(true)
                        }
                    })
                    .catch(err=>console.log(err))
                   }else{
                      setMobileCheckErr(true)
                   }
                }
            }else{
                setCpassErr(true)
            }        
        }
        
  return(
      <div className='b_form'>
         {loader?  <Loader />:null}
         <ToastContainer />
        <form onSubmit={signUpHandler} className='w-50 p-4 my-5 mx-auto bg-white shadow'>
            <h4 className='text-center'>Sign Up</h4>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">First Name <span className='text-danger'>*</span></label>
                <input required type="text" className="form-control" value={user.fname} onChange={fnameHandler}  />
        
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Last Name<span className='text-danger'>*</span></label>
                <input required type="text" className="form-control" value={user.lname} onChange={lnameHandler}  />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address <span className='text-danger'>*</span></label>
                <input required type="email" className="form-control" value={user.email} onChange={emailHandler}  />
                <span className='text-danger'>{emailCheckErr?"Email is already taken":""}</span>
            </div>
            <div className="form-group">
                <label htmlFor="mobile">Mobile Number <span className='text-danger'>*</span></label>
                <input required type="number" className="form-control" value={user.monumber} onChange={numberHandler}  />
                <span className='text-danger'>{mobileCheckErr?"Invalid mobile number!":""}</span>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password <span className='text-danger'>*</span></label>
                <input required type="password" className="form-control" id="password" value={user.password} onChange={passwordHandler}  />
                <span className='text-danger'>{passLengthErr?"Password length must be greater 6 charcters":""}</span>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Confirm Password <span className='text-danger'>*</span></label>
                <input required type="password" className="form-control" id="confirmPassword"  value={user.cpassword} onChange={cpasswordHandler}/>
                <span className='text-danger'>{cpassErr?"Password and Confirm password are not match!":""}</span>
            </div>
            <button type="submit" className={`btn  b_btn_light_red `}>SIGNUP</button>
        </form>

      </div>
  );
}
