/*
REF:
https://www.npmjs.com/package/mongoose
*/
const mongoose = require("mongoose")

// Get MongoDB URI from environment variable or use default
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stationerydb'

//Env PROD con Docker
//mongoose.connect("mongodb://database/mydatabase")

mongoose.connect(MONGODB_URI)
.then(() => console.log('DB Connected!'))
.catch(err => console.log("Error de Conexion: " + err))