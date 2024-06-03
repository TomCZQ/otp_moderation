const { check } = require("express-validator");

exports.disposValidator = [
  check("id").not().isEmpty().withMessage("ID nulle"),
  check("titre").not().isEmpty().withMessage("Nick ou username nul"),
];
