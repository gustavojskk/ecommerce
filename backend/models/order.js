// Importando as dependências
const mongoose = require('mongoose');

// Definindo o esquema do pedido
const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalPrice: Number,
  customerName: String,
  customerEmail: String,
});

// Definindo o modelo do pedido
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
