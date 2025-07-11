const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  imagen: { type: String, required: true, trim: true }
}, { timestamps: true });

const Category = mongoose.model('Categoria', categorySchema);
module.exports = Category; 