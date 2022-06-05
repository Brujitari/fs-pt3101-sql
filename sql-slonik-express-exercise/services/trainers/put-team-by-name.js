const errors = require('../../errors')
const { putTeamToLeader } = require('../../queries/trainers')

module.exports = db => async (req, res, next) => {
    const { leader } = req.params
    const { pokemons } = req.body

    if(!pokemons || !pokemons.length) return next(errors[400])

    const queryResult = await putTeamToLeader(db)(pokemons, leader)

    if(!queryResult.ok) return next(errors[400])

    res.status(200).json({
        success: true,
        data: queryResult.data,
    })
}