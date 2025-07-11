const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const alumnoSchema = new Schema(
  {
    nombre: { type: String},
    edad: { type: Number}
  },
  {
    timestamp: true,
    versionKey: false
  }
);

const alumnoModel = mongoose.model('alumnos', alumnoSchema);

module.exports = alumnoModel;