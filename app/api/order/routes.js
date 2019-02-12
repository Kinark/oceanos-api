const app = module.exports = require('express')()
const controller = require('./controller')
const onlyAuth = require('~/app/api/user/services').onlyAuth
const reqWithJwt = require('~/app/api/user/services').reqWithJwt
const reqWithStore = require('~/app/api/store/services').reqWithStore

app.use('/orders', onlyAuth, reqWithJwt, reqWithStore)

app.get('/stores', controller.find)
app.get('/stores/:_id', controller.findOne)
app.post('/orders', controller.new)
app.put('/orders', controller.update)
app.delete('/orders', controller.delete)
