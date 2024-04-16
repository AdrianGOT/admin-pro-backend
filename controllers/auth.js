// Express
const { response } = require('express');

// External libreries
const bcrypt = require('bcryptjs');

// own modules
const  User  = require('../models/user.models');
const { generateJWT } = require('../helpers/jwt')

const login = async(req, res = response) => {
    const {email , password} = req.body;

    try{
        // Check email
        const userInDB = await User.findOne({email});

        if(!userInDB){
            return res.status(404).json({
                ok: false,
                msg: 'User does not exist'
            })
        }

        // Check password
        const validPassword = bcrypt.compareSync(password, userInDB.password);
        
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'The values are not the corrects, please check'
            })
        }

        // generate jwt
        const token = await generateJWT(userInDB.id);

        res.json({
            ok: true,
            token
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Something is going wrong, Talk to administrator'
        })
    }
}


module.exports = {
    login
}