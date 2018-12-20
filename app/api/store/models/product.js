const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   amount: {
      type: Number,
      required: false
   },
   cost: {
      type: Number,
      required: false
   },
   price: {
      type: Number,
      required: true
   }
});

module.exports = ProductSchema;
