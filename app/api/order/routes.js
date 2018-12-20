const app = module.exports = require('express')()
const controller = require('./controller')
const onlyAuth = require('~/app/api/user/services').onlyAuth

app.use('/orders', onlyAuth)

app.get('/stores', controller.find)
app.get('/stores/:_id', controller.findOne)
app.post('/orders', controller.new)
app.put('/orders', controller.update)
app.delete('/orders', controller.delete)
