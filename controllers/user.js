// express
const { response } = require('express');

// External libreries
const bcrypt = require('bcryptjs');


// Own Models 
const User = require('../models/user.models');
const { generateJWT } = require('../helpers/jwt')

const getUsers = async (req, res)=> {
    const from = Number(req.query.from) || 0;
    
    const [users, total] = await Promise.all([
        User
            .find({}, 'name email role google')
            .skip(from)
            .limit(from), 
        User.countDocuments()
    ])


    res.json({
        ok: 200,
        users,
        total,
        uid: req.uid
    })
}

const createUser = async (req, res = response) =>{
    const { email, password} = req.body;
    
    try{
        const existingEmail = await User.findOne({email});
        
        if(existingEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exist'
            });
        }
        const user = new User(req.body);
        user.password = encryptPassword( password );

        await user.save();
        const token = await generateJWT(user.id);

        
        res.status(201).json({
            ok: true,
            user,
            token
        })
        


    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, please check logs'
        })
    }


}

const updateUser = async(req, res = response) => {
    const uid = req.params.id;

    try{

        const userInDB = await User.findById(uid);
        
        if(!userInDB){
            res.status(404).json({
                ok: false,
                msg: 'Does not exist a user with id supplied'
            })
        }
        // TODO validate JWT

        // Update information
        const {password, google, email , ...fields} = req.body;

        if(email !== userInDB.email){

            const hasEqualEmail = await User.findOne({email: fields.email}); 
            if(hasEqualEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'The email supplied already exist!'
                })
            }
        }
        
        const userUpdated = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok: true, 
            user: userUpdated 
        })
    }catch(err) {
        console.log(err);
        res.status(400).json({
            ok: false,
            msg: 'Unexpected error , try again! '
        })
    }

}

const deleteUser = async(req, res = response) => {
    const uid = req.params.id;
    console.log(uid);
    try {
        console.log(uid);
        const userInDB = await User.findById(uid);
        console.log(userInDB);

        if(!userInDB){
            return res.status(404).json({
                ok: false,
                msg: 'The user doen not exist'
            })
        }

        await User.findByIdAndUpdate(uid, {active: false})
        res.status(200).json({
            ok: true,
            msg: "user deleted"
        })

    } catch (error) {
        
    }

}


// Methods --------------------
const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}
    


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}