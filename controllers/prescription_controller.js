import { Sharedprescription } from "../models/shared_prescriptions_model.js";

export const addSharedPrescriptions = async (req,res) => {
    const logggedDoctor = await req.user;
    if (!logggedDoctor) {
        return res.status(401).json({'message':'No login doctor found'});
    }
    const logggedDoctorId = logggedDoctor.id;
    const {patientId, prescriptionsArray} = req.body;
    if (!patientId || !prescriptionsArray) {
        return res.status(401).json({'message':'Patient id or prescriptions are missing'}); 
    }
    try {
        const patientExist = await Sharedprescription.findOne({logggedDoctorId,patientId});
        const prescriptions = [];
        for (let index = 0; index < prescriptionsArray.length; index++) {
            const prescription = prescriptionsArray[index];
            const doctorId = prescription.doctor_detail.doctor_id;
            const isMine = doctorId===logggedDoctor.id;
            const data = {
                'presc_id': prescription.id,
                'isMine':isMine
            }
            prescriptions.push(data);
        }
        if (patientExist) {
            await Sharedprescription.findOneAndUpdate({logggedDoctorId,patientId},{$push:{prescriptions:{$each:prescriptions}}});
            return res.status(200).json({'message':'Prescriptions added to the database',patientExist});  
        }
        const sharedPrescriptions = await Sharedprescription.create({
            doctor:logggedDoctorId,
            patientId,
            prescriptions
        });
        return res.status(201).json({'message':'Prescriptions added to the database',sharedPrescriptions});
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error occurred",
            error: error.message
        });
    }
}