import { FORM_DETAILS } from "../Constanant"

const initialState = {
    details:[]
}

export const formDetailsReducer = (state=initialState, action)=>{
    switch(action.type){
        case FORM_DETAILS:
            return{
                ...state,
                 details:action.payload
            }
            break
        default:
            return state
    }
} 