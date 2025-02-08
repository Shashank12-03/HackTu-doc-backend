import Doctor from "../models/doctor_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginDoctor = async (req, res) => {
    try{

        const email = req.body.email;
        const password = req.body.password;

        const doctor = await Doctor.findOne({email : email});

        if(!doctor){
            console.log("Here");
            return res.status(404).json({
                message : "No account for this email found"
            });
        }

        const doesMatch = await bcrypt.compare(password, doctor.password);

        if(!doesMatch){
            return res.status(401).json({
                message : "Password does not match the user with the email"
            });
        }

        const token = jwt.sign({
            id : doctor._id,
            email: email
        }, process.env.jwt_secret_key);

        return res.status(200).json({
            message : "User logged in",
            token : token,
            name : doctor.name,
            profilePicture : doctor.profile_picture_url
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message
        });
    }
}

export const checkDoctorExists = async (req, res) => {
    try{
  
        const email = req.body.email;
  
        const doctor = await Doctor.findOne({
           email : email
        });
  
        if(doctor){
           return res.status(409).json({
              message : "An user with this email address already exists"
           });
        } 
        
        return res.status(200).json({
           message : "User for this email does not exist"
        });
  
  
     } catch (err){
        return res.status(500).json({
           message : "Internal server error occured",
           error : err.message
        });
     }
}


export const onboardDoctor = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, gender, dob, profilePictureUrl, speciality, qualifications, licenseNumber, clinicAddress, clinicPhone, clinicName,years_of_experience } = req.body;

        const existingDoctor = await Doctor.findOne({ email: email });

        if (existingDoctor) {
            return res.status(409).json({
                message: "An user with this email address already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDoctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            phone: phoneNumber,
            gender,
            date_of_birth:dob,
            profile_picture_url: profilePictureUrl,
            speciality,
            qualifications,
            license: licenseNumber,
            clinic_address: clinicAddress,
            clinic_phone: clinicPhone,
            clinic_name: clinicName,
            years_of_experience
        });

        const token = jwt.sign({
            id: newDoctor._id,
            email: email
        }, process.env.jwt_secret_key);

        return res.status(201).json({
            message: "Doctor onboarded successfully",
            token: token,
            name: newDoctor.name,
            profilePicture: newDoctor.profile_picture_url
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error occurred",
            error: err.message
        });
    }
}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTdjZjZlOGM0NDJlYmZlODk0YjQ5ZiIsImVtYWlsIjoiZW1pbHlzbWl0aEBleGFtcGxlLmNvbSIsImlhdCI6MTczOTA1MDg2Mn0.JVemHec1l1GNAcucP2mHchSVhuaecpYNNNShAQrOtiw
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTdjZmMyZGNiNDcwYmNiOTI3YjUzMSIsImVtYWlsIjoicmFqcGF0ZWxAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzkwNTA5NDZ9.xfLODiwj2fhDmZE05ePpUQrXWkJ42mOc3R9mhQW9AVg
