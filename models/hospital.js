const {model, Schema} = require('mongoose');


const HospitalSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

HospitalSchema.method('toJSON', function(){
    const  { __v, _id , password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Users', HospitalSchema);