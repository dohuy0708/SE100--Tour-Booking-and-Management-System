import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';    
import router from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const PORT=process.env.PORT||8080;
const MONGO_URL=process.env.MONGO_URL as string;

if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error('Missing MAIL_USER or MAIL_PASS in .env');
    process.exit(1);
}

const server=http.createServer(app);

server.listen(PORT,()=>{
    console.log('Server is running on http://localhost:'+PORT);
});




mongoose.Promise=Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error:Error)=>{
    console.log('MongoDB connection error: ',error);
});

app.use('/', router());