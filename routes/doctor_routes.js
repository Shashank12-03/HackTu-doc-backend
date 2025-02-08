import {Router} from 'express';
import { searchDoctor } from '../controllers/doctor_controller.js';

export const doctorRoutes = Router();

doctorRoutes.get('/search-doctor/search',searchDoctor);