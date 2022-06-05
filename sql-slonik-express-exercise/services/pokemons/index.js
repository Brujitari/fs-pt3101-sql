const router = require('express').Router()

module.exports = db => {
    router.get('/', require('./get-all')(db))
    router.get('/types', require('./get-types')(db))
    router.get('/:pokemon', require('./get-one-by-name')(db))
    router.get('/type/:element', require('./get-by-one-type')(db))
    router.post('/new', require('./post-new')(db))

    return router
}