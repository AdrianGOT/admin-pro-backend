// External modules
const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {

    return new Promise((resolve, reject)=> {
        const payload = {
            uid
        }
    
        jwt.sign(payload, process.env.JWT_SECRET_KEY,{
            expiresIn: '12h'
        }, (err, token)=> {
            if(err) reject('JWT can not be generated')
            else resolve(token)
        })

    })

}

module.exports = {
    generateJWT
}