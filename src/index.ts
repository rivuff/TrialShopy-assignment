import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();
const app = express();


const MONGO_URI: string = process.env.MongoURI || '';

mongoose.connect(MONGO_URI).then(() => {
    console.log("DB CONNECTED!");
})


// Middlewares
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());

// Routes
app.use('/', router())


// Port
const port = process.env.PORT || 3000;

// Start Server Message
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});

