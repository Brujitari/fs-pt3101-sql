const { queryCatcher } = require('../../utils/commons')
const {
    selectAllInfoFromPokemonsAndElements,
    selectAllTypes,
    selectAllWithJustOneType,
    selectDetailsByName,
    insertNew,
    insertTypeRelation,
} = require('./queries')

const selectAll = db => async (types, length) => {
    return await queryCatcher(
        db.query, 'pokemons, selectAll fn'
    )(selectAllInfoFromPokemonsAndElements(types, length))
}

const selectTypes = db => async () => {
    return await queryCatcher(
        db.query, 'pokemons, selectType fn'
    )(selectAllTypes)
}

const selectByOneType = db => async () => {
    return await queryCatcher(
        db.query, 'pokemons, selectByOneType fn'
    )(selectAllWithJustOneType)
}

const selectOneByName = db => async pokemon => {
    return await queryCatcher(
        db.maybeOne, 'pokemons, selectOneByName fn'
    )(selectDetailsByName(pokemon))
}

const insertNewPokemon = db => async (id, name, level, types) => {
    return await db.transaction(async tx => {
        await queryCatcher(
            tx.query, 'pokemons, insertNewPokemon fn1'
        )(insertNew(id, name, level))

        for await(const type of types) {
            await queryCatcher(
                tx.query, `pokemons, insertNewPokemon fn${types.indexOf(type) + 1}`
            )(insertTypeRelation(name, type))
        }

        return await selectOneByName(tx)(name)
    })
}

module.exports = {
    selectAll,
    selectTypes,
    selectByOneType,
    selectOneByName,
    insertNewPokemon,
}