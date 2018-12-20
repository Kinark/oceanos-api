const mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   amount: {
      type: Number,
      required: false,
      default: 0,
   },
   cost: {
      type: Number,
      required: false,
      default: 0,
   },
});

module.exports = InputSchema;
