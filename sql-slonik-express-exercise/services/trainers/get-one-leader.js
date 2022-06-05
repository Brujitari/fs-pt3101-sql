const errors = require('../../errors')
const { selectAll } = require('../../queries/trainers')

module.exports = db => async (req, res, next) => {
    const { leader } = req.params

    const queryResult = await selectAll(db)(leader)

    if(!queryResult.ok) return next(errors[400])

    res.status(200).json({
        success: true,
        data: queryResult.data,
    })
}