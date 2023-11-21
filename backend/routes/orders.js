// Importando as dependências
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

// Rota para obter todos os pedidos
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('products');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

// Rota para criar um novo pedido
router.post('/', async (req, res) => {
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

module.exports = router;
