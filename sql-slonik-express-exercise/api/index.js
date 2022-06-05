const pokeapi = require('../configs/api')

const getNewPokemon = async pokemon => {
    try {
        const result = await pokeapi.get(`/pokemon/${pokemon}`)
        
        const { id, name, types } = result.data

        return {
            api_ok: true,
            data: { id, name, types: types.map(({ type }) => type.name) },
        }
    } catch(error) {
        console.info('[api, getNewPokemon fn]')
        console.error('> ', error.message)

        return {
            api_ok: false,
            statusCode: error.response.status === 404 ? error.response.status : 500,
            error: error.response.status === 404 ? error.response.data : 'server error',
        }
    }
}

module.exports = {
    getNewPokemon,
}