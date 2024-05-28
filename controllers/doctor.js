const {response} = require('express');
const Doctor = require('../models/doctors');

const getDoctors = async( req, res = response ) => {

    const doctors = await Doctor.find()
                        .populate('user', 'name email')
                        .populate('hospital', 'name');    
    res.json({
        ok: true,
        doctors
    })
}

const createtDoctor = async( req, res = response ) => {
    const {hospital, user} = req.body;

    const newDoctor = new Doctor({
        user,
        hospital,
        ...req.body
    })

    try {

        const doctorCreaterd = await newDoctor.save();

        return res.json({
            ok: true, 
            doctor: doctorCreaterd
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error unexpected, talk to administrator'
        })        
    }


}

const updateDoctor = async( req, res = response ) => {
    
    
    const { id } = req.params;
    const uid = req.uid;

    try {

        // Search doctor
        const doctorDB = await Doctor.findById(id);

        if(!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'The doctor searched doesnt exist'
            })
        }

        const doctorChanges = {
            ...req.body,
            user: uid,
            
        }

        // Save update 
        const doctorUpdated = await Doctor.findByIdAndUpdate(
            id, doctorChanges, { new: true }
        )

        res.json({
            ok: true,
            doctor: doctorUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, please, talk to the administrator'
        })
    }
}

const deleteDoctor = async( req, res = response ) => {

    const { id } = req.params;

    try {

        const doctorDB = await Doctor.findById(id);

        if(!doctorDB){
            return res.status(404).json({
                ok: false,
                msg: 'The doctor research doesnt exist'
            })
        }
        
        
         await Doctor.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'The doctor has been desactivated'
        })

    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'UnExpected error, please talk to the administrator'
      })      
    }
}

module.exports = {
    getDoctors,
    createtDoctor,
    updateDoctor,
    deleteDoctor
}