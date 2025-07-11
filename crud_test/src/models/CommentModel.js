const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  productoId: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
  usuarioId: { type: Schema.Types.ObjectId, ref: 'User' },
  nombreUsuario: { type: String, required: true, trim: true },
  texto: { type: String, required: true, trim: true },
  imagenes: [ { type: String, trim: true } ],
  fecha: { type: Date, required: true, default: Date.now },
  editado: { type: Boolean, required: true, default: false },
  respuestas: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      usuarioId: { type: Schema.Types.ObjectId, ref: 'User' },
      nombreUsuario: { type: String, required: true, trim: true },
      texto: { type: String, required: true, trim: true },
      imagenes: [ { type: String, trim: true } ],
      fecha: { type: Date, required: true, default: Date.now },
      editado: { type: Boolean, required: true, default: false }
    }
  ]
}, { timestamps: true });

const Comment = mongoose.model('Comentario', commentSchema);
module.exports = Comment; 