const { check, validationResult } = require("express-validator");

exports.loginUserValidator = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("T'as même pas entré ton pseudo fais un effort"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Le mot de passe c'est pas une option hein"),
];

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
