const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  usuarioId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  correo: { type: String, required: true, trim: true, lowercase: true },
  productos: [
    {
      productoId: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
      variacionId: { type: Schema.Types.ObjectId, ref: 'Variacion', required: true },
      nombre: { type: String, required: true, trim: true },
      cantidad: { type: Number, required: true, min: 1 },
      precioUnitario: { type: Number, required: true, min: 0 }
    }
  ],
  total: { type: Number, required: true, min: 0 },
  estado: { type: String, required: true, enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'], default: 'pendiente' },
  direccionEnvio: {
    calle: { type: String, required: true, trim: true },
    ciudad: { type: String, required: true, trim: true },
    pais: { type: String, required: true, trim: true },
    codigoPostal: { type: String, required: true, trim: true }
  },
  fechaPedido: { type: Date, required: true, default: Date.now },
  metodoPago: { type: String, required: true, trim: true }
}, { timestamps: true });

const Order = mongoose.model('Pedido', orderSchema);
module.exports = Order; 