const errors = require('../../errors')
const { selectOneByName, insertNewPokemon } = require('../../queries/pokemons')
const { capitalize } = require('../../utils/commons')
const { getNewPokemon } = require('../../api')

module.exports = db => async (req, res, next) => {
    const { pokemon } = req.params

    if(!pokemon) return next(errors[400])

    let queryResult = await selectOneByName(db)(capitalize(pokemon))

    if(!queryResult.ok) return next(errors[400])

    if(queryResult.ok && !queryResult.data) {
        const apiResult = await getNewPokemon(pokemon)

        if(!apiResult.api_ok) return next({
            statusCode: apiResult.statusCode,
            error: new Error(apiResult.error)
        })

        const { id, name, types } = apiResult.data

        queryResult = await insertNewPokemon(db)(id, capitalize(name), 1, types)
    }

    if(!queryResult.ok) return next(errors[400])

    res.status(200).json({
        success: true,
        data: queryResult.data,
    })
}