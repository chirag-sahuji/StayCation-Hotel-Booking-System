import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import hotelRoute from './routes/hotels.js'
import authRoute from './routes/auths.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import paymentRoute from './routes/payments.js'
import cors from 'cors';
import Razorpay from 'razorpay'
const app = express()
dotenv.config()


import cookieParser from 'cookie-parser'

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: [ 'http://localhost:3000', 'http://localhost:3001']
}));

mongoose.connect(process.env.MONGO_URL).then(() => console.log("connection successfull"))
.catch(()=>console.log("no connection"))

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/payment', paymentRoute);
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMsg = err.message || "Something wnt wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        messgae: errorMsg,
        stack:err.stack,
    })
})

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret : process.env.RAZORPAY_API_SECRET
})

app.listen(4000);