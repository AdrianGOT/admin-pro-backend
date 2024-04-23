const { response } = require('express');
const { validationResult } = require('express-validator');


const checkField = (req, res = response, next) => {
    console.log(req.body);
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }
    next();
}

module.exports = {
    checkField
}