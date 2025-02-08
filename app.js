import express from 'express';
import authRoutes from './routes/auth_routes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connect } from './connect.js';
import { checkAuthentication } from './middleware/auth.js';
import { userRoutes } from './routes/user_routes.js';
import { pillRoutes } from './routes/pill_reminder_routes.js';
import { prescriptionRoutes } from './routes/prescription_routes.js';

dotenv.config();
const PORT = process.env.PORT;

// database connection 
const mongoUrl = process.env.mongo_url;
connect(mongoUrl)
.then(()=> console.log("Mongodb connected"))
.catch((err)=> console.log("Error occured: ", err));

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/user',checkAuthentication, userRoutes);
app.use('/pill',checkAuthentication, pillRoutes);
app.use('/prescriptions',checkAuthentication, prescriptionRoutes);

// listen to the server
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));