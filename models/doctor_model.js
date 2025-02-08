import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true,
        enum : ['MALE', 'FEMALE', 'INTERSEX', 'TRANSGENDER(ASSIGNED MALE AT BIRTH', 'TRANSGENDER(ASSIGNED FEMALE AT BIRTH']
    },
    date_of_birth : {
        type : Date,
        required : true
    },
    profile_picture_url : {
        type : String,
        required : true
    },
    license : {
        type : String,
        required : true
    },
    qualifications : [
        {
            type : String,
        }
    ],
    speciality : {
        type : String
    },
    years_of_experience : {
        type : Number,
        required : true
    },
    clinic_address : {
        type : String
    },
    clinic_phone : {
        type : String
    },
    clinic_name:{
        type : String
    },
    shared_prescription :{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Sharedprescription'
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
