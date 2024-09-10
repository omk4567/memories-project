import express from 'express';  
import bodyParser from 'body-parser';  
import mongoose from 'mongoose';  
import cors from 'cors';      
import dotenv from 'dotenv';  
import postRoutes from './routes/posts.js'

const app = express();      
dotenv.config();  
const allowedOrigins = ['https://my-memories-project123.netlify.app', 'http://localhost:3000']; 

app.use(bodyParser.json({limit: "50mb", extended: "true"}));      
app.use(bodyParser.urlencoded({limit: "50mb", extended: "true"}));   
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
    
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site does not allow access from the specified origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));   

app.use('/posts', postRoutes);
app.get('/', (req, res) => {
    res.send('Hello to Memories API');   
})  

const PORT = process.env.PORT || 5000;            



mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));   
