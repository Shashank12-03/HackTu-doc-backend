import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connect } from './connect.js'; 
import cors from 'cors';
import doctorAuthRoutes from './routes/auth_routes.js';
import { doctorRoutes } from './routes/doctor_routes.js';

dotenv.config();
const PORT = process.env.PORT;

const mongoUrl = process.env.mongo_url;
connect(mongoUrl)
.then(()=> console.log("Mongodb connected"))
.catch((err)=> console.log("Error occured: ", err));


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', doctorAuthRoutes);
app.use('/doctor', doctorRoutes);


app.listen(PORT, ()=> console.log(`Server running on port : ${PORT}`));



