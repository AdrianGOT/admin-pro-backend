// node
const  path  = require('path');

// Express
const { response } = require("express");
const {v4:uuidv4} = require('uuid');

// Helpers
const { updateImage } = require('../helpers/update-image');

// Functions
const fileUpload = (req, res = response) => {
    const type = req.params.type;
    const id = req.params.id;

    const extensionAllowed = ['png', 'jpg', 'jpeg', 'gif'];

    // Check if there is a file in the request
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'There isn\t a file in the request'
        })
    }

    // Process image
    const file = req.files.image;
    const nameSplitted = file.name.split('.');
    const fileExtension = nameSplitted[nameSplitted.length - 1];
    
    if(!extensionAllowed.includes(fileExtension)){
        return res.status(400).json({
            ok: false,
            msg: 'The file extension is not allowed'
        })
    }

    // Saving image
    const newImageName = `${ uuidv4() }.${fileExtension}`;
    const pathToSave = `./uploads/${type.toLowerCase()}/${newImageName}`;
    
    file.mv(pathToSave, (err)=> {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'There is an error saving image'
            })
        }

        updateImage( type, id, newImageName );
        res.json({
            ok: true,
            msg: 'The file has been uploaded succesfully ',
            newImageName,
        })
    })
    

  
}

const returnImage = (req, res = response) => {
    const {type, photo} = req.params;
    console.log(type, photo);

    const pathImg = path.join(__dirname, `../uploads/${type}/${photo}` );

    res.sendFile(pathImg);


}


module.exports = {
    fileUpload,
    returnImage
}