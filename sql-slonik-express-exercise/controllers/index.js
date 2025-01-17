const router = require("express").Router();

module.exports = (db) => {
   router.use("/pokemons", require("./pokemons")(db));
   router.use("/trainers", require("./trainers")(db));
   router.use("/types", require("./types")(db));

   return router;
};