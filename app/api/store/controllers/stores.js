const Store = require('../model')

module.exports = {

   /**
    * Adds a new store to the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   new: ({ body: { name, address, storeType }, authToken }, res) => {
      const store = new Store({ owner: authToken._id, name, address, storeType })
      store.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.status(201).send(store)
      })
   },

   /**
    * Lists stores owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   find: ({ authToken }, res) => {
      Store.find({ owner: authToken._id }, (err, stores) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.send(stores)
      })
   },

   /**
    * Lists one store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   findOne: ({ params, authToken }, res) => {
      Store.findOne({ owner: authToken._id, _id: params._id }, (err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         if (!store) return res.sendStatus(404)
         res.send(store)
      })
   },

   /**
    * Updates one store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   update: ({ authToken, body: { _id, name, address, storeType } }, res) => {
      const toBeUpdated = {}
      if (typeof name !== 'undefined') toBeUpdated.name = name
      if (typeof address !== 'undefined') toBeUpdated.address = address
      if (typeof storeType !== 'undefined') toBeUpdated.storeType = storeType
      Store.findOneAndUpdate({ owner: authToken._id, _id }, toBeUpdated, { new: true, runValidators: true }, (err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         if (!store) return res.sendStatus(404)
         res.send(store)
      })
   },

   /**
    * Delete one store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   delete: ({ authToken, body: { _id } }, res) => {
      Store.findOneAndDelete({ owner: authToken._id, _id }, err => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.sendStatus(204)
      })
   },
}
