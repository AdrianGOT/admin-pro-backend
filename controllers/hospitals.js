
const {response} = require('express');

// Model
const Hospital = require('../models/hospital');

const getHospitals = async(req, res = response) =>{
    const hospitals = await Hospital.find().populate('user', 'name email');
    
    res.status(200).json({
        ok: true,
        hospitals
    })
}

const createHospital = async(req, res = response) =>{
    
    const newHospital =  new Hospital({ user: req.uid, ...req.body });

    try{

        const hospitalSaved = await newHospital.save();

        res.json({
            ok: true,
            hospital: hospitalSaved
        })

    }catch(err){

        res.status(500).json({
            ok: false, 
            msg: 'Error unexpected, talk to the administrator'
        })
    }
}

const updateHospital = (req, res = response) =>{
    res.status(200).json({
        ok: true,
        msg: 'updateHospital'
    })
}

const deleteHospital = (req, res = response) =>{
    res.status(200).json({
        ok: true,
        msg: 'deleteHospital'
    })
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,
}