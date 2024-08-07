const express = require('express');
const session = require("express-session");
const { initializingPassport } = require("./middlewere/passportConfig.js");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./api_doc/swagger.json');

// router
const authApiRouter = require('./router/user');
const errorHandler = require('./middlewere/error_handler.js');


const app = express();
require("dotenv").config({ path: "./.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.MONGODB_URL)


app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL, autoReconnect: true }),
}))

// passport
app.use(passport.initialize());
app.use(passport.session());

initializingPassport(passport, mongoose);

// router 
app.use(authApiRouter)

app.use(errorHandler);

// Swagger
app.use('/app-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


module.exports = app;