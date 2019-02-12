const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   amount: {
      type: Number,
      required: true,
      default: 1,
   },
   cost: {
      type: Number,
      required: false
   },
   price: {
      type: Number,
      required: true
   },
   done: {
      type: Number,
      required: false,
      default: 0
   },
   obs: {
      type: String,
      required: false
   }
});

const OrderSchema = new mongoose.Schema({
   store: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
   },
   closed: {
      type: Boolean,
      required: true,
      default: false
   },
   table: {
      type: Number,
      required: true
   },
   products: [ProductSchema],
   customTotal: {
      type: Number,
      required: false
   }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
