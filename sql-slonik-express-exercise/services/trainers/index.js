const router = require('express').Router()

module.exports = db => {
    router.get('/', require('./get-all')(db))
    router.get('/:leader', require('./get-one-leader')(db))
    router.put('/:leader/pokemons', require('./put-team-by-name')(db))
    router.post('/new', require('./post-new.js')(db))

    return router
}