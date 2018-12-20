const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model')

module.exports = {

   /**
    * Signup controller
    * @param {object} req - req object from express.
    * @param {object} res - res object from express.
    */
   signUp: ({ body: { email, name, password } }, res) => {
      const newUser = new User({ email, name, password })
      newUser.save((err, user) => {
         if (err) {
            if (err.code === 11000) return res.status(400).send({ msg: 'Email already in use.' })
            return res.status(400).send({ msg: 'Something went wrong' })
         }
         const userCopy = Object.assign({}, user._doc)
         delete userCopy.password;
         res.status(201).send(userCopy)
      })
   },

   /**
    * JWT Controller
    * Needs to be called every 1 hour by the client, since it renews the logged in token.
    * @param {object} req - req object from express.
    * @param {string} req.cookies.jwt_token - The token itself
    * @param {object} res - res object from express.
    * @returns {void}
    */
   jwtHandler: (req, res, next) => {
      // Check for JWT Token on cookies
      if (!req.cookies.jwt_token || (req.body.email && req.body.password)) return next()
      // Verify and decode the JWT Token
      return jwt.verify(req.cookies.jwt_token, process.env.JWT_SECRET, (err, decoded) => {
         // Return if token is invalid or expired
         if (err) return res.status(422).send({ msg: 'Expired or invalid token.' })
         // Renew the JWT Token
         const renewedToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: decoded.exp })
         // Set the cookie
         res.cookie('jwt_token', renewedToken, { secure: process.env.NODE_ENV === 'production', httpOnly: true });
         res.cookie('jwt_token', renewedToken, {
            expires: decoded.rememberMe ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : 0,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true
         });
         // Send the response
         return res.send({ token: renewedToken })
      })
   },

   /**
    * Login controller
    * Logs user in and creates a cookie.
    * @param {object} req - req object from express.
    * @param {string} req.email - User's email.
    * @param {string} req.password - User's password.
    * @param {boolean} [req.rememberMe] - Should the session be remembered?.
    * @param {object} res - res object from express.
    * @returns {void}
    */
   login: (req, res) => {
      const { email, password, rememberMe } = req.body
      // Check if inputs exist
      if (!req.body.email || !req.body.password) return res.status(400).send({ msg: 'Missing email or password.' })
      // Search for the email
      User.findOne({ email }, function (err, userFound) {
         // Check for errors
         if (err) return res.status(400).send({ msg: 'Something went wrong' })
         // Encrypt the password anyways
         bcrypt.compare(password, userFound ? userFound.password : 'bathroom', (err, hashMatch) => {
            // Check for encryption errors
            if (err) return res.status(400).send({ msg: 'Something went wrong' })
            // Return in case of no existent user or wrong password
            if (!userFound || !hashMatch) return res.status(422).send({ msg: 'Wrong email or password.' })
            // User and password are right
            // Generate the login token
            const token = jwt.sign({ _id: userFound._id, rememberMe }, process.env.JWT_SECRET, { expiresIn: rememberMe ? '7d' : '24h' });
            // Set the cookie
            res.cookie('jwt_token', token, {
               expires: rememberMe ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : 0,
               secure: process.env.NODE_ENV === 'production',
               httpOnly: true
            });
            // Send the response
            return res.send({ token })
         });
      })
   },

   /**
    * Logout controller
    * Logs user out.
    * @returns {void}
    */
   logout: (req, res) => {
      if (!req.cookies.jwt_token || (req.body.email && req.body.password)) return res.sendStatus(200)
      res.clearCookie('jwt_token', req.cookies.jwt_token, {
         expires: req.cookies.jwt_token.exp,
         secure: process.env.NODE_ENV === 'production',
         httpOnly: true
      });
      res.sendStatus(200)
   }
}
