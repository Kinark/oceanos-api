require('dotenv').config()
require('./db')
const app = require('express')()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//
// ─── MIDDLEWARES ────────────────────────────────────────────────────────────────
//

app.use(bodyParser.json())
app.use(cookieParser())
app.use((req, res, next) => {
   res.type('json');
   req.eita = 'hehehe'
   next();
});
app.use(function (error, req, res, next) {
   if (error instanceof SyntaxError) {
      res.status(400).send({ msg: 'Something went really really wrong with the syntax (probably broken JSON).' });
   } else {
      next();
   }
});
app.use(require('./api/user/services').reqWithJwt)

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//

app.get('/', (req, res) => res.send('Hello World!'))

app.use(require('./api/user/routes'))
app.use(require('./api/store/routes'))

app.all('*', (req, res) => res.status(404).send({ msg: 'not found' }))

//
// ─── INITIALIZATION ─────────────────────────────────────────────────────────────
//

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
