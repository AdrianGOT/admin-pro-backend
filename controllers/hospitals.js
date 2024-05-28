
const {response} = require('express');

// Model
const Hospital = require('../models/hospital');
const hospital = require('../models/hospital');

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

const updateHospital = async(req, res = response) =>{
    const {id} = req.params;
    
    
    try{
        const hospitalDB = await Hospital.findById(id);
        const uid = req.uid;
        
        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'The hospital doesnt exist'
            })
        }
        
        console.log(id);
    
        const hospitalChanges = { 
            ...req.body,
            user: uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, hospitalChanges, {new: true})
        
        res.status(200).json({
            ok: true,
            hospital: hospitalUpdated
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, please talk to the administrator'
        })
    }

}

const deleteHospital = async(req, res = response) =>{
    
    const {id} = req.params;

    try {

        // Search hospital
        const hospitalDB = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'The hospital doesnt exist'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Hospital deleted'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, please talk to the administrator'
        })
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,
}