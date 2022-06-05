const { sql } = require('slonik')

const selectAllLeadersInfoByCities = sql`
    SELECT
        g.city, l.badge, l.name AS leader, array_agg(p.name) AS pokemons
    FROM leaders AS l
    INNER JOIN pokemons AS p
    ON l.id = p.leader_id
    INNER JOIN gyms AS g
    ON l.id = g.leader_id
    GROUP BY g.city, l.badge, l.name;
`

module.exports = {
    selectAllLeadersInfoByCities,
}