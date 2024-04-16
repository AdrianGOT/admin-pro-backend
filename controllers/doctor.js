const {response} = require('express');

const getDoctors = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'getDoctors'
    })
}

const createtDoctor = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'createtDoctor'
    })
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