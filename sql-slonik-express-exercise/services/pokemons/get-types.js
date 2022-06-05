const errors = require('../../errors')
const { selectTypes } = require('../../queries/pokemons')

module.exports = db => async (_, res, next) => {
    const queryResult = await selectTypes(db)()

    if(!queryResult.ok) return next(errors[400])

    res.status(200).json({
        success: true,
        data: queryResult.data.map(type => type.name),
    })
}