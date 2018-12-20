module.exports = {

   /**
    * Adds a new product to a store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   new: ({ body: { name, amount, cost, price }, currentStore }, res) => {
      currentStore.products.push({ name, amount, cost, price })
      currentStore.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.status(201).send(store)
      })
   },

   /**
    * Updates a product in a store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   update: ({ body: { _id, name, amount, cost, price }, currentStore }, res) => {
      const selectedProduct = currentStore.products.id(_id)
      if (!selectedProduct) return res.sendStatus(404)
      if (typeof name !== 'undefined') selectedProduct.name = name
      if (typeof amount !== 'undefined') selectedProduct.amount = amount
      if (typeof cost !== 'undefined') selectedProduct.cost = cost
      if (typeof price !== 'undefined') selectedProduct.price = price
      currentStore.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.send(store)
      })
   },

   /**
    * Deletes a product from a store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   delete: ({ body: { _id }, currentStore }, res) => {
      const selectedProduct = currentStore.products.id(_id)
      if (!selectedProduct) return res.sendStatus(404)
      selectedProduct.remove()
      currentStore.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.send(store)
      })
   },
}
