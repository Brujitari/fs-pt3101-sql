const { sql } = require('slonik')
const { normalizer } = require('../../utils/commons')

const whereLeader = leader => {
    if(leader) return sql`
        WHERE slug = ${leader}
    `

    return sql``
}

const selectAllFromLeadersAndGyms = leader => sql`
    SELECT l.name, l.badge, l.description, g.city, array_agg(p.name) AS team
    FROM leaders AS l
    INNER JOIN gyms AS g
    ON l.id = g.leader_id
    INNER JOIN pokemons AS p
    ON l.id = p.leader_id
    ${whereLeader(leader)}
    GROUP BY l.name, l.badge, l.description, g.city;
`

const selectOne = (col, value) => sql`
    SELECT * FROM leaders
    WHERE ${sql.identifier([col])} = ${value};
`

const insertLeader = (name, badge, description) => sql`
    INSERT INTO leaders (
        name, badge, description, slug
    ) VALUES (
        ${name}, ${badge}, ${description}, ${normalizer(name)}
    );
`

const insertGym = (leaderId, city) => sql`
    INSERT INTO gyms (
        leader_id, city
    ) VALUES (
        ${leaderId}, ${city}
    );
`

const linkPokemonToLeader = (pokemon, leader) => sql`
    UPDATE pokemons
    SET leader_id = (
        SELECT id FROM leaders
        WHERE slug = ${leader}
    ) WHERE name = ${pokemon};
`

module.exports = {
    selectAllFromLeadersAndGyms,
    insertLeader,
    insertGym,
    selectOne,
    linkPokemonToLeader,
}