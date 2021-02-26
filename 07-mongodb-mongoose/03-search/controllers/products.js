const Product = require('../models/Product');

const productMapper = (product) => ({
  id: product._id,
  title: product.title,
  images: product.images,
  category: product.category,
  subcategory: product.subcategory,
  price: product.price,
  description: product.description,
});

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query} = ctx.query;

  const productsDb = await Product.find({$text: {$search: query}});
  const products = productsDb.map((product) => productMapper(product)) || [];

  ctx.body = {products};
};
