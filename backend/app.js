// Importando as dependências
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configurando o aplicativo Express
const app = express();
const port = 3000;

// Conectando ao banco de dados MongoDB
mongoose.connect('mongodb://172.16.0.213:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

// Definindo o esquema do produto
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

// Definindo o modelo do produto
const Product = mongoose.model('Product', productSchema);

// Definindo o esquema do pedido
const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalPrice: Number,
  customerName: String,
  customerEmail: String,
});

// Definindo o modelo do pedido
const Order = mongoose.model('Order', orderSchema);

// Middleware para analisar o corpo da solicitação como JSON
app.use(bodyParser.json());

// Rota para obter todos os produtos
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Rota para criar um novo pedido
app.post('/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const products = await Product.find({ _id: { $in: orderData.products } });
    const totalPrice = products.reduce((total, product) => total + product.price, 0);

    const order = new Order({
      products: orderData.products,
      totalPrice,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
    });

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
