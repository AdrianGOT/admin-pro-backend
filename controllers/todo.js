const {response} = require('express');
const User     = require('../models/user.models');
const Hospital = require('../models/hospital');
const Doctor   = require('../models/doctors');

const getAll = async(req, res = response ) => {
    // const wordToSearch = req.query.search;
    const wordToSearch = req.params.search;
    const regex = new RegExp(wordToSearch, 'i')
    
    const [users, hospitals, doctors] = await Promise.all([
        User.find({name: regex}),
        Hospital.find({name: regex}),
        Doctor.find({name: regex})
    ])


    console.log(wordToSearch);
    return res.json({
        ok: true,
        users, 
        hospitals, 
        doctors
    })

}

const getAllByCollections = async(req, res=response ) => {
    const table = req.params.table;
    const search = req.params.search;

    if(!getTableToSearch[table]){
        return res.status(404).json({
            ok: false,
            msg:"The table supplied doesnt exist" +
                "you must select from the following" + 
                "options: user / hospital / doctor"
        });
    }

    const regex = new RegExp(search, 'i');
    const namesMatches = await getTableToSearch[table].find({name: regex});
    
    res.json({
        ok: true,
        table: namesMatches,
    })
}


const getTableToSearch = {
    'doctor': Doctor,
    'hospital': Hospital,
    'user': User,
}

module.exports = {
    getAll,
    getAllByCollections
}