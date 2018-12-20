const mongoose = require('mongoose');
// const validator = require('validator');

const WorkerSchema = require('./models/worker')
const InputSchema = require('./models/input')
const ProductSchema = require('./models/product')

const StoreSchema = new mongoose.Schema({
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
   },
   name: {
      type: String,
      required: true,
      trim: true,
   },
   address: {
      type: String,
      required: false,
      trim: true,
   },
   storeType: {
      type: String,
      required: true,
      enum: ['store', 'restaurant'],
      trim: true
   },
   workers: {
      type: [WorkerSchema],
      required: false,
   },
   inputs: {
      type: [InputSchema],
      required: false
   },
   products: {
      type: [ProductSchema],
      required: false
   },
});

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;
