const { JWT_SECRET } = require("../secrets/index"); // use this secret!
const jwt = require('jsonwebtoken')

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      // Token verification failed
      return res.status(401).json({ message: "Token invalid" });
    }

    // Token is valid
   if(req.decodedToken = decodedToken){
    next();
   };
   
  });
};

const only = role_name => (req, res, next) => {
  // Check if the decodedToken exists on the request object
  if (!req.decodedToken) {
    return res.status(403).json({ message: "This is not for you" });
  }

  // Check if the role_name in the decoded token matches the role_name argument
  if (req.decodedToken.role_name !== role_name) {
    return res.status(403).json({ message: "This is not for you" });
  }

  // If everything is okay, proceed to the next middleware
  next();
};


const checkUsernameExists = (req, res, next) => {
  /*
    If the username in req.body does NOT exist in the database
    status 401
    {
      "message": "Invalid credentials"
    }
  */
 next();
}


const validateRoleName = (req, res, next) => {
  // If role_name is not provided in the request, set it to '3' (default role)
  if (!req.body.role_name) {
      req.body.role_name = 'student';
  } else {
      // If role_name is provided, trim it
      req.body.role_name = req.body.role_name.trim();
  }
      // Respond with error if role_name is 'admin'
      if (req.body.role_name.toLowerCase() === 'admin') {
          return res.status(422).json({
              message: "can not be admin"
          });
      }

      if (req.body.role_name.toLowerCase() === 'instructor') {
        req.body.role_id = '2'
    }
  
      // Respond with error if role_name is over 32 characters
      if (req.body.role_name.length > 32) {
          return res.status(422).json({
              message: "can not be longer than 32 chars"
          });
      }
  

  // Proceed to the next middleware
  next();
};




module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
