import Doctor from "../models/doctor_model.js";
import jwt from 'jsonwebtoken';
import { secret } from "../services/auth.js";


export const searchDoctorByName = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({'message':'token required'});
    }
    const doctorName = req.query.doctor_name;
    try {
        const user = jwt.verify(token, secret);
        if (!user) {
            return res.status(404).json({'message':'User not found'});
        }
        const doctors = await Doctor.find({ name: doctorName }).select('id name profile_picture_url qualifications speciality clinic_name');
        return res.status(200).json({'message':`List of doctors for ${doctorName}`,'doctorList':doctors});
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error occurred",
            error: error.message
        });
    }
}
