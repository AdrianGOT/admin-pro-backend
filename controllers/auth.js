// Express
const { response } = require('express');

// External libreries
const bcrypt = require('bcryptjs');

// own modules
const  User  = require('../models/user.models');
const { generateJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async(req, res = response) => {
    
    try{
        const {email, name, picture} = await googleVerify(req.body.token);
        const userInDB = await User.findOne({email});
        let user;

        if(!userInDB){
            user = new User({
                name, 
                email,
                password: '@@',
                img: picture,
                google: true
            })
        }else{ 
            user = userInDB;
            user.google = true;
        }

        // Save user
        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            email,
            name, 
            picture,
            token
        })
        
    }catch(err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg: 'The google token is not correct'
            })

    }

}

const renewToken = async(req, res = response) => {
    const uid = req.uid;

    const token = await generateJWT(uid);
    
    res.json({
        ok:true,
        token
    })
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}