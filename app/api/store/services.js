const Store = require('./model')

module.exports = {
   reqWithStore: (req, res, next) => {
      req.currentStore = false
      if (!req.body.currentStore) return res.status(400).send({ msg: 'No store specified' })
      return Store.findOne({ owner: req.authToken._id, _id: req.body.currentStore }, (err, store) => {
         if (err || !store) return res.status(400).send({ msg: 'Something went wrong' })
         req.currentStore = store
         return next()
      })
   }
}
