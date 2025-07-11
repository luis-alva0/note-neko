const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  categoria: { type: String, required: true, trim: true },
  imagenes: [
    { type: String, required: true, trim: true }
  ],
  etiquetas: [
    { type: String, required: true, trim: true }
  ],
  variaciones: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      tipo: { type: String, required: true, trim: true },
      valor: { type: String, required: true, trim: true },
      precio: { type: Number, required: true, min: 0 },
      stock: { type: Number, required: true, min: 0 }
    }
  ],
  fechaCreacion: { type: Date, required: true, default: Date.now },
  likes: [
    { type: Schema.Types.ObjectId, ref: 'User', required: true }
  ]
}, { timestamps: true });

const Product = mongoose.model('Producto', productSchema);
module.exports = Product; 