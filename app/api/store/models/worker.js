const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const validator = require('validator');

const WorkerSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isEmail, 'Please fill a valid email address']
   },
   password: {
      type: String,
      required: true,
   }
});

WorkerSchema.pre('save', function (next) {
   const user = this;
   bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
   })
});

module.exports = WorkerSchema;
