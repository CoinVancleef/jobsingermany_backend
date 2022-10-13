const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const { router } = require("./routes/user");

const app = express();

dontenv.config();

// database

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"));

mongoose.connection.on("error", (err) => console.log(`DB FAILURE: ${err}`));

// middleware

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(expressValidator());

app.use("/", router);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App is listening at port ${port}`));
