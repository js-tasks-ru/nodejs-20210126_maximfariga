const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.handleInvalidObjectId = async function handleInvalidObjectId(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.status = 400;
    ctx.body = 'Invalid id';

    return;
  }

  next();
};

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  ctx.body = {};
};

module.exports.productList = async function productList(ctx, next) {
  ctx.body = {};
};

module.exports.productById = async function productById(ctx, next) {
  const product = await Product.findById(ctx.params.id);
  console.log('TRYING TO FIND');

  if (!product) {
    console.log('NOT FOUND');
    ctx.status = 404;
    ctx.body = 'Not Found';
  } else {
    console.log('CLIENT ID: ', ctx.params.id);
    console.log('PRODUCT: ', product);
    const formattedObj = {
      id: product._id,
      title: product.title,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      description: product.description,
    };

    console.log('Formatted product:', formattedObj);

    // ctx.body = {product: formattedObj};
    ctx.status = 200;
    ctx.body = {title: 'MAX'};
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
