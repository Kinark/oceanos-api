const app = module.exports = require('express')()
const controller = require('./controller')
const onlyAuth = require('~/app/api/user/services').onlyAuth
const reqWithStore = require('./services').reqWithStore

app.use('/stores', onlyAuth)
app.use(['/stores/workers', '/stores/inputs', '/stores/products'], reqWithStore)

app.get('/stores', controller.stores.find)
app.get('/stores/:_id', controller.stores.findOne)
app.post('/stores', controller.stores.new)
app.put('/stores', controller.stores.update)
app.delete('/stores', controller.stores.delete)

app.post('/stores/workers', controller.workers.new)
app.put('/stores/workers', controller.workers.update)
app.delete('/stores/workers', controller.workers.delete)

app.post('/stores/inputs', controller.inputs.new)
app.put('/stores/inputs', controller.inputs.update)
app.delete('/stores/inputs', controller.inputs.delete)

app.post('/stores/products', controller.products.new)
app.put('/stores/products', controller.products.update)
app.delete('/stores/products', controller.products.delete)
