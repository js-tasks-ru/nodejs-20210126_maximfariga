const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find().populate('subcategories');

  const categoriesFormatted = categories.map((item) => ({
    id: item._id,
    title: item.title,
    subcategories: item.subcategories.map((subItem) => ({
      id: subItem._id,
      title: subItem.title,
    })),
  }));

  ctx.body = {categories: categoriesFormatted};
};
