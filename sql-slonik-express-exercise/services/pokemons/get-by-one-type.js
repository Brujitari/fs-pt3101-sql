const errors = require('../../errors')
const { selectByOneType } = require('../../queries/pokemons')

module.exports = db => async (req, res, next) => {
    const { element } = req.params

    if(!element) return next(errors[400])

    const queryResult = await selectByOneType(db)()

    if(!queryResult.ok) return next(errors[400])

    res.status(200).json({
        success: true,
        data: queryResult.data
            .filter(({ type }) => type.includes(element))
            .map(({ id, name, level }) => ({ id, name, level }))
    })
}