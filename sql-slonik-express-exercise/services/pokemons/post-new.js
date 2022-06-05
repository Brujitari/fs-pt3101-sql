const errors = require('../../errors')
const { insertNewPokemon } = require('../../queries/pokemons')
const { capitalize } = require('../../utils/commons')

module.exports = db => async (req, res, next) => {
    const { id, name, level = 1, types = [] } = req.body

    if(!id || !name) return next(errors[400])

    const queryResult = await insertNewPokemon(db)(id, capitalize(name), level, types)

    if(!queryResult.ok) return next(errors[400])

    res.status(200).json({
        success: true,
        data: queryResult.data,
    })
}