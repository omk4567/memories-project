import React, {useState} from 'react'; 
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';    
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
import { AUTH } from '../../constants/actionTypes';    
import { useNavigate } from 'react-router-dom'; 
import useStyles from './styles'; 
import Input from './Input';   
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; 
import Icon from './Icon';  
import {jwtDecode} from 'jwt-decode';     
import { signin, signup } from '../../actions/auth';       

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }; 

const Auth = () => {   
  const classes = useStyles(); 
  const dispatch = useDispatch();   
  const [showPassword, setShowPassword] = useState(false);  
  const [isSignup, setIsSignup] = useState(false);        
  const [formData, setFormData] = useState(initialState);  
  const navigate = useNavigate(); 
   
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);  
  const handleSubmit = (e) => {  
    e.preventDefault(); 
    
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }

  }  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value}); 
  } 

  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp); 
    setShowPassword(false); 
  }       

  const googleSuccess = async (response) => {
    try {
    const { credential } = response;
    const decodedToken = jwtDecode(credential);
    // console.log('User profile:', decodedToken);
    // console.log('ID token:', credential);
    // You can now send the tokenId to your backend for further validation (if needed)    

    localStorage.setItem('profile', JSON.stringify({ result: decodedToken, token: credential }));

    // Dispatch user info to Redux store if necessary
    dispatch({ type: AUTH, data: { result: decodedToken, token: credential } });      

    navigate('/');  
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  }    

  const googleFailure = (error) => {
    console.log('Google Sign-In failed with error:', error);
    console.error('Full error details:', error);  // Log the full error for better understanding
  }

  return (
    <Container component="main" maxWidth="xs"> 
      <Paper className={classes.paper} elevation={3}> 
        <Avatar className={classes.avatar}> 
          <LockOutlinedIcon /> 
        </Avatar> 
        <Typography variant="h5">{isSignup? 'Sign Up' : 'Sign In'}</Typography>  
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
              <>
               <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
               <Input name="lastName" label="Last Name" handleChange={handleChange} half />  
               </> 
            )}    
           <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
           <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} autocomplete="current-password"/>   
           { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }  
          </Grid>    
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>  
          <GoogleOAuthProvider clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}>    
          <GoogleLogin    
            uxMode="popup"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>    
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"  
            scope="profile email"
          />   
          </GoogleOAuthProvider> 
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid> 
        </form>
      </Paper>
    </Container>
  )
}

export default Auth; 
