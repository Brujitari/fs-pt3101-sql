<<<<<<< HEAD
const express = require("express");
const { DEV_PORT } = require("./constants");
const errors = require("./errors");
const db = require("./configs/db");
const app = express();

app.use(express.json());

app.use("/", require("./controllers")(db));

app.use((req, res, next) => {
    next(errors[404]);
});

app.use(( {statusCode, error }, req, res, next) => {
    res.status(statusCode).json({
        success: false,
        message: error.message,
    });
});

app.listen(process.env.PORT || DEV_PORT, () => {
    console.info(`🌋Listening on port ${process.env.PORT || DEV_PORT}🌋`)
});
=======
const express = require('express')
const db = require('./configs/db')
const errors = require('./errors')
const { DEV_PORT } = require('./constants')
const app = express()

app.use(express.json())

app.use(require('./services')(db))

app.use((_, __, next) => {
    next(errors[404])
})

app.use(({ statusCode, error }, _, res, __) => {
    res.status(statusCode).json({
        success: false,
        message: error.message,
    })
})

app.listen(process.env.PORT || DEV_PORT, () => {
    console.info('> listening at: ', process.env.PORT || DEV_PORT)
})
>>>>>>> ca7191cbb2cfdde1d894cec6817af7cd5ce994c4
