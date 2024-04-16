
const {response} = require('express');

const getHospitals = (req, res = response) =>{
    res.status(200).json({
        ok: true,
        msg:'getHospitals'
    })
}

const createHospital = (req, res = response) =>{
    res.status(200).json({
        ok: true,
        msg: 'createHospital'
    })
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