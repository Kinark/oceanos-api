module.exports = {

   /**
    * Adds a new worker to a store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   new: ({ body: { name, email, password }, currentStore }, res) => {
      currentStore.workers.push({ name, email, password })
      currentStore.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.status(201).send(store)
      })
   },

   /**
    * Updates a worker in a store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   update: ({ body: { _id, name, email, password }, currentStore }, res) => {
      const selectedWorker = currentStore.workers.id(_id)
      if (!selectedWorker) return res.sendStatus(404)
      if (typeof name !== 'undefined') selectedWorker.name = name
      if (typeof email !== 'undefined') selectedWorker.email = email
      if (typeof password !== 'undefined') selectedWorker.password = password
      currentStore.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.send(store)
      })
   },

   /**
    * Deletes a worker from a store owned by the current user.
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   delete: ({ body: { _id }, currentStore }, res) => {
      const selectedWorker = currentStore.workers.id(_id)
      if (!selectedWorker) return res.sendStatus(404)
      selectedWorker.remove()
      currentStore.save((err, store) => {
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         res.send(store)
      })
   },
}
