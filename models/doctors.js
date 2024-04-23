const { model, Schema } = require('mongoose');

const DoctorSchema = Schema({
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
        require: true,
        ref: 'Users'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Hospital',
    }
})

DoctorSchema.method('toJSON', function(){
    const  { __v, _id , ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Doctor', DoctorSchema);