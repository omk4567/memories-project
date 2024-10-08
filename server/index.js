import express from 'express';  
import bodyParser from 'body-parser';  
import mongoose from 'mongoose';  
import cors from 'cors';      
import dotenv from 'dotenv';  
import postRoutes from './routes/posts.js'; 
import userRoutes from './routes/users.js'

const app = express();      
dotenv.config();  

app.use(bodyParser.json({limit: "50mb", extended: "true"}));      
app.use(bodyParser.urlencoded({limit: "50mb", extended: "true"}));   
app.use(cors());   

app.use('/posts', postRoutes);   
app.use('/user', userRoutes); 
app.get('/', (req, res) => {
    res.send('Hello to Memories API');   
})  

const PORT = process.env.PORT || 5000; 
           



mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));   
