exports.userValidator = (req, res, next) => {
  req.check("email", "email format is not correct").isEmail();
  req
    .check("fullname", "Full name must be between 2 and 50 characters")
    .isLength({
      min: 2,
      max: 50,
    });
  req
    .check("password", "password must have at least 8 characters")
    .isLength({ min: 8 });
  req.check("avatarUrl").optional().isURL();

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((err) => err.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
};
