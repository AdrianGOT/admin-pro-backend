const User = require('../models/user.models');

const checkValidTable = (req, res, next) => {

    const table = req.params.type;
    const tableAllowed = ['hospitals', 'users', 'doctors'];

    if(!tableAllowed.includes(table)){
        return res.json({
            ok: false,
            msg: 'The table supplied isn\'t correct.' + 
                'The opcions are: hospital / doctor / user' 

        })
    }
    next();
}

const checkUserExist = async(res, req, next) => {
    const id = req.params.id;
    
    const user = User.findOne({id: uid});
    if(!user){
        return res.json({
            ok: false,
            msg: 'The user with id supplied doesn\'t exist'

        })
    }


    next();
}

module.exports = {
    checkUserExist,
    checkValidTable
}