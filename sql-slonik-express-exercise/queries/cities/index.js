const { queryCatcher } = require('../../utils/commons')
const { selectAllLeadersInfoByCities } = require('./queries')

const selectAll = db => async () => {
    return await queryCatcher(
        db.query, 'cities, selectAll fn'
    )(selectAllLeadersInfoByCities)
}

module.exports = {
    selectAll,
}