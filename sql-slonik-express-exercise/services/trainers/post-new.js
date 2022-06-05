const errors = require('../../errors')
const { insertNewLeader } = require('../../queries/trainers')

module.exports = db => async (req, res, next) => {
    const { name, badge, description, city } = req.body

    if(!name || !badge || !description || !city) return next(errors[400])

    const queryResult = await insertNewLeader(db)(name, badge, description, city)

    if(!queryResult.ok) return next(errors[400])

    res.status(200).json({
        succes: true,
        data: queryResult.data,
    })
}