// Importando as dependências
const mongoose = require('mongoose');

// Definindo o esquema do produto
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

// Definindo o modelo do produto
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
