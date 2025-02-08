import mongoose from "mongoose";

const SharedPrescriptionsSchema = new mongoose.Schema({
    doctor:{
        type : mongoose.Schema.Types.ObjectId, 
        required : true,
        ref:'Doctor'
    },
    patientId : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true
    },
    prescriptions : [
        {
            presc_id : {
                type : mongoose.Schema.Types.ObjectId, 
                required : true
            },
            isMine : {
                type : Boolean, 
                required : true
            }
        }
    ]
});

SharedPrescriptionsSchema.index({ patientId: 1, doctor: 1 }, { unique: true });

export const Sharedprescription = mongoose.model('Sharedprescription',SharedPrescriptionsSchema);