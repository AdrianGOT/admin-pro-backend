const {model, Schema} = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    }

});

UserSchema.method('toJSON', function(){
    const  { __v, _id , password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Users', UserSchema);