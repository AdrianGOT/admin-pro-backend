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

const updateDoctor = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'updateDoctor'
    })
}

const deleteDoctor = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'deleteDoctor'
    })
}

module.exports = {
    getDoctors,
    createtDoctor,
    updateDoctor,
    deleteDoctor
}