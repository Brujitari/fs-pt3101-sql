const { selectAll } = require('../../queries/trainers')
const errors = require('../../errors')

module.exports = db => async (_, res, next) => {
    const queryResult = await selectAll(db)()

    if(!queryResult.ok) return next(errors[400])

    res.status(200).json({
        success: true,
        data: queryResult.data,
    })
}