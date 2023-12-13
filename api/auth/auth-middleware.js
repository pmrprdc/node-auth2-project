const { JWT_SECRET } = require("../secrets"); // use this secret!


const restricted = (req, res, next) => {
  /*
    If the user does not provide a token in the Authorization header:
    status 401
    {
      "message": "Token required"
    }

    If the provided token does not verify:
    status 401
    {
      "message": "Token invalid"
    }

    Put the decoded token in the req object, to make life easier for middlewares downstream!
  */
}

const only = role_name => (req, res, next) => {
  /*
    If the user does not provide a token in the Authorization header with a role_name
    inside its payload matching the role_name passed to this function as its argument:
    status 403
    {
      "message": "This is not for you"
    }

    Pull the decoded token from the req object, to avoid verifying it again!
  */
}


const checkUsernameExists = (req, res, next) => {
  /*
    If the username in req.body does NOT exist in the database
    status 401
    {
      "message": "Invalid credentials"
    }
  */
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
