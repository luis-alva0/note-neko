const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  correo: { type: String, required: true, unique: true, trim: true, lowercase: true },
  contraseña: { type: String, required: true },
  direccion: {
    calle: { type: String, trim: true },
    ciudad: { type: String, trim: true },
    pais: { type: String, trim: true },
    codigoPostal: { type: String, trim: true }
  },
  telefono: { type: String, trim: true },
  rol: { type: String, default: 'usuario', trim: true },
  fechaRegistro: { type: Date, default: Date.now },
  carrito: [
    {
      productoId: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
      variacionId: { type: Schema.Types.ObjectId, ref: 'Variacion', required: true },
      cantidad: { type: Number, required: true, min: 1 }
    }
  ],
  favoritos: [
    { type: Schema.Types.ObjectId, ref: 'Producto', required: true }
  ]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.contraseña);
};

const User = mongoose.model('User', userSchema);
module.exports = User; 