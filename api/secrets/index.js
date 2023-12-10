/**
  This module exports the JWT_SECRET variable. It first tries to get the value from
  the environment variable 'JWT_SECRET'. If 'JWT_SECRET' is not set in the environment,
  it falls back to the string "shh". This ensures that tests and other developers cloning
  the repository can run the project without needing to set up this environment variable.
 */
  module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "shh"
  }
  