const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   }
});

module.exports = OrderSchema;
