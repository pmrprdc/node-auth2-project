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
  let role_name = req.body.role_name ? req.body.role_name.trim() : '';

  // Handling missing role_name by setting a default role
  if (!role_name) {
      req.body.role_name = '3'; // Replace 'user' with your actual role name that corresponds to role_id 2
      return next();
  }


  // Respond with error if role_name is 'admin'
  if (role_name.toLowerCase() === 'admin') {
      return res.status(422).json({
          message: "Role name cannot be admin"
      });
  }

  // Respond with error if role_name is over 32 characters
  if (role_name.length > 32) {
      return res.status(422).json({
          message: "Role name cannot be longer than 32 chars"
      });
  }

  // Set the trimmed role_name and proceed
  req.body.role_name = role_name;
  next();
};



module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
