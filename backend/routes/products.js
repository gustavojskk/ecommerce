// Importando as dependências
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Rota para obter todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Rota para adicionar um novo produto
router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
});

module.exports = router;
