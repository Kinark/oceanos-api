module.exports = {

   /**
    * Adds a new input to a store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   new: ({ body: { name, amount, cost }, currentStore }, res) => {
      currentStore.inputs.push({ name, amount, cost })
      currentStore.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.status(201).send(store)
      })
   },

   /**
    * Updates an input in a store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   update: ({ body: { _id, name, amount, cost }, currentStore }, res) => {
      const selectedInput = currentStore.inputs.id(_id)
      if (!selectedInput) return res.sendStatus(404)
      if (typeof name !== 'undefined') selectedInput.name = name
      if (typeof amount !== 'undefined') selectedInput.amount = amount
      if (typeof cost !== 'undefined') selectedInput.cost = cost
      currentStore.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.send(store)
      })
   },

   /**
    * Deletes an input from a store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   delete: ({ body: { _id }, currentStore }, res) => {
      const selectedInput = currentStore.inputs.id(_id)
      if (!selectedInput) return res.sendStatus(404)
      selectedInput.remove()
      currentStore.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.send(store)
      })
   },
}
