const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// POST endpoint for registering a new user
router.post("/register", validateRoleName, async (req, res, next) => {
  try {
      // Extract user data from request body
      const { username, password, role_name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 8); // 8 is the number of rounds for salting

      const newUser = await Users.add({ username, password: hashedPassword, role_name});
      res.status(201).json(newUser);
  } catch (error) {
      // Handle any errors that might occur during registration
      console.error(error);
      res.status(500).json({ message: 'Error registering new user' });
  }
});




router.post('/login', (req, res) => {
  let { username, password } = req.body;
   Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new line
        // the server needs to return the token to the client
        // this doesn't happen automatically like it happens with cookies
        res.status(200).json({
          message: `${user.username} is back.`,
          token, // attach the token as part of the response
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


function generateToken(user) {
  const payload = {
    subject: user.user_id,  // Assuming 'user.id' is 1 for the test user
    role_name: user.role_name,
    username: user.username
  };
  

  const options = {
    expiresIn: '1h', // show other available options in the library's documentation//
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, JWT_SECRET, options); // this method is synchronous
}

module.exports = router;
