const mongoose = require('mongoose');
const connection = require('../libs/connection');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: 'Название товара должно быть уникальным',
    minLength: [10, 'Минимальное количество символов 10'],
  },
  description: {
    type: String,
    required: true,
    minLength: [20, 'Минимальное количество символов 20'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Поле не может быть отрицательным'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true,
  },
  images: [String],
});

module.exports = connection.model('Product', productSchema);
