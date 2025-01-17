import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connectDB.js';  //also give extension of file

dotenv.config({})      //so that we can access config from .env file

connectDB();

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server listen at port ${PORT}`)
})
