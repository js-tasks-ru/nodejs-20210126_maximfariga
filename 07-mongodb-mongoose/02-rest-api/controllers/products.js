const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const productMapper = require('../mappers/product');

module.exports.handleInvalidObjectId = function handleInvalidObjectId(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.status = 400;
    ctx.body = 'Invalid id';
    return;
  }

  return next();
};

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;

  if (!subcategory) {
    return next();
  }

  if (!mongoose.Types.ObjectId.isValid(subcategory)) {
    ctx.status = 400;
    ctx.body = 'Invalid subcategory id';
    return;
  }

  const productsDb = await Product.find({subcategory});
  const products = productsDb.map((product) => productMapper(product)) || [];

  ctx.body = {products};
};

module.exports.productList = async function productList(ctx, next) {
  const productsDb = await Product.find();
  const products = productsDb.map((product) => productMapper(product)) || [];

  ctx.body = {products};
};

module.exports.productById = async function productById(ctx, next) {
  const productDb = await Product.findById(ctx.params.id);

  if (!productDb) {
    ctx.status = 404;
    ctx.body = 'Not Found';
  } else {
    const product = productMapper(productDb);

    ctx.body = {product};
  }
};

let count = 0;

module.exports.productCreate = async function productCreate(ctx, next) {
  const newCount = count++;

  const category = await Category.create({
    title: `My category ${newCount}`,
    subcategories: [{title: `My subcategory ${newCount}`}],
  });

  const product = await Product.create({
    title: `Some product title ${newCount}`,
    description: `Some description for product ${newCount}`,
    price: 100,
    category: category.id,
    subcategory: category.subcategories[0].id,
  });

  ctx.status = 201;
  ctx.body = product;
};
