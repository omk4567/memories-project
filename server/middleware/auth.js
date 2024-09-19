import {jwtDecode} from 'jwt-decode'; 
import jwt from "jsonwebtoken";  


// need of middlewares 
// user wants to like a post 
// click the like button => auth middleware (next) (auth middleware say no problem)=> like controller will be called     

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        const isCustomAuth = token.length < 500;  

        let decodedData; 

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');     

            req.userId = decodedData?.id;                             
        }        
        else{
            decodedData = jwtDecode(token);                           
        
            req.userId = decodedData?.sub;           
        }  

        next(); 
    } catch (error) {
        console.log(error);            
    }
}  

export default auth;  