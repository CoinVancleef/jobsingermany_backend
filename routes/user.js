const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/user");
const { userValidator } = require("../validations/auth");
const { checkAuth } = require("../utils/checkAuth");

const router = express.Router();

router.post("/auth/register", userValidator, registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", checkAuth, getUser);

module.exports = {
  router,
};
