import { Router } from 'express';
import { loginDoctor, checkDoctorExists,onboardDoctor } from '../controllers/auth_controller.js';
import { check } from 'express-validator';
import { validateRequest} from '../middleware/validate_request.js';

const doctorAuthRoutes = Router();

doctorAuthRoutes.post('/login-doctor', 
    check('email').isEmail().withMessage('Email is not valid'),
validateRequest,  loginDoctor);

doctorAuthRoutes.post('/check-doctor-exists',  [
    check('email').isEmail().withMessage("Please enter a valid email"),
    check('password').custom((value, {req}) => {
        const passwordRegex = /^(?=(.*[a-zA-Z].*){5})(?=(.*\d.*){2})(?=(.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*){1}).{8,}$/;
        if(!passwordRegex.test(value)){
            throw new Error('Password must contain atleast 5 alphabets, 2 digits and 1 special symbol');
        }
        return true;
    }),
    check('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Passwords do not match');
        }
        return true;
    })
], validateRequest, checkDoctorExists);

doctorAuthRoutes.post('/add-doctor',onboardDoctor);

export default doctorAuthRoutes;