const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const products = [];

const router = express.Router();

router.get('/add-product', (req, res, next ) => {
  res.render('add-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
    formsCSS: true,
    activeAddProduct: true,
    productCSS: true
  });
});

router.post('/add-product', (req, res, next ) => {
  products.push({title: req.body.title});
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
