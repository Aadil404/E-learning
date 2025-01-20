import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connectDB.js';  //also give extension of file 
import userRoutes from './routes/user.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';


dotenv.config({})      //so that we can access config from .env file

connectDB();

const app = express()

const PORT = process.env.PORT || 3000


//default middlewares
app.use(cors())
app.use(express.json());
app.use(cookieParser());

//apis
app.use('/api/user', userRoutes);   //call userRoutes when user hit /api/user route

app.listen(PORT, () => {
    console.log(`server listen at port ${PORT}`)
})
