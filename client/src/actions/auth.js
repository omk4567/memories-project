import { AUTH } from '../constants/actionTypes';   
import * as api from '../api/index.js';  

export const signin = (formData, navigate) => async (dispatch) => {
    try {  
        // log in the user   
        const {data} = await api.signIn(formData);   
        
        localStorage.setItem('profile', JSON.stringify({ result: data.result, token: data.token })); 

        dispatch({ type: AUTH, data });   

        navigate('/');            
    } catch (error) {
        console.log(error); 
    }
}  

export const signup = (formData, navigate) => async (dispatch) => {
    try {  
        // sign up the user   
        
        const {data} = await api.signUp(formData); 

        localStorage.setItem('profile', JSON.stringify({ result: data.result, token: data.token }));   

        dispatch({ type: AUTH, data });   

        navigate('/'); 
    } catch (error) {
        console.log(error); 
    }
}