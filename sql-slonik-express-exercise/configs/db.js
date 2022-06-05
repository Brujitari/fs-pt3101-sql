<<<<<<< HEAD
const slonik = require("slonik");
const { DB_URL } = require("../constants")

module.exports = slonik.createPool(DB_URL)
=======
const slonik = require('slonik')

module.exports = slonik.createPool(require('../constants').DB_URL_DEV)
>>>>>>> ca7191cbb2cfdde1d894cec6817af7cd5ce994c4
