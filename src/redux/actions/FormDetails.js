import { FORM_DETAILS } from "../Constanant";

// create the actions

export const formDetails = (userData=[])=>{
     return{
         type:FORM_DETAILS,
         payload:userData
     }
 }

