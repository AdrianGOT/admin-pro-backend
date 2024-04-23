const fs = require('fs') 

// Models
const User = require('../models/user.models');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctors');

const deleteImage = (path) => {
    if(fs.existsSync(path)) fs.unlinkSync(path);
}

const updateImage = async( type = '', id, fileName ) => {
    // console.log( type, id, path, fileName);

    const newType = type.slice(0, type.length - 1);
    const model = modelSelection[ newType ];
    const element = await model.findById(id);

    if(!element) return false;
    
    const oldImagePath = `./uploads/${type}/${element.img}`;
    deleteImage(oldImagePath);
    
    element.img = fileName;
    
    await element.save();
    return true;

    

}

const modelSelection = {
    'hospital':Hospital,
    'doctor'  :Doctor,
    'user'    :User,
}

module.exports = {
    updateImage
};