const express = require('express');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();
const path = require('path');

//crear el servidor / aplicación de express
const app = express();

//Base de datos
dbConnection();

//Directorio public
app.use( express.static('public') )

// CORS
app.use(cors());

//Lectura y parseo del Body
app.use(express.json());

//Rutas
app.use('/api/auth', authRoutes);

//Manejar las demás rutas, por ejemplo angular.
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});