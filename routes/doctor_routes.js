import {Router} from 'express';
import { searchDoctorByName } from '../controllers/doctor_controller.js';

export const doctorRoutes = Router();

doctorRoutes.get('/search-doctor/search',searchDoctorByName);