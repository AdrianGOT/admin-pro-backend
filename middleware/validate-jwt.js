const jwt = require('jsonwebtoken');


const validateJWT = (req, res, next) => {
    // read token
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'The user is not login'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY );
        req.uid = uid;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Wrong Token'
        })
    }

    next();
}

module.exports = {
    validateJWT
}