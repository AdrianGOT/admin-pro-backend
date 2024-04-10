const express = require('express');
const {dbConnection} = require('./database/config');
require('dotenv').config();
const cors = require('cors');
// Creating express server
const app = express();

app.use( cors() );
// user => AdrianGOT
// Password => sNDi6o42stODG77u

dbConnection();
// console.log(process.env);
// Routes
app.get( '/' , (req, res)=> {
    res.status(400).json({
        ok: true,
        msg: 'Hola mundo'
    });
});

app.listen(process.env.PORT, ()=> {
    console.log('Server running in 3005 port');
});