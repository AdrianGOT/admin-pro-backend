const express = require('express');
const {dbConnection} = require('./database/config');
require('dotenv').config();
const cors = require('cors');
// Creating express server
const app = express();

app.use( cors() ); // Cors
app.use(express.static('public')); // Middelware to open google authentication when the app start
app.use( express.json() ); // read and parse of the body

// user => AdrianGOT
// Password => sNDi6o42stODG77u

dbConnection();
// console.log(process.env);

// Routes

app.use('/api/users', require('./routes/user'));
app.use('/api/hospital', require('./routes/hospital'));
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todo', require('./routes/todo'));
app.use('/api/upload', require('./routes/upload'));

// app.get( '/' , (req, res)=> {
//     res.status(200).json({
//         ok: true,
//         msg: 'Hola mundo'
//     });
// });

// app.get('/api/users', (req, res)=> {
//     res
// });


app.listen(process.env.PORT, ()=> {
    console.log('Server running in 3005 port');
});