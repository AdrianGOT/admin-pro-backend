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
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

});

HospitalSchema.method('toJSON', function(){
    const  { __v, _id , password, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Hospital', HospitalSchema);