const { sql } = require('slonik')

const whereTypes = (type1, type2) => {
    if(type1 && type2) return sql`
        WHERE e.name = ${type1}
        OR e.name = ${type2}   
    `

    return type1 ? sql`WHERE e.name = ${type1}` : sql``
}

const selectIdFromAnyPokemon = pokemon => sql`
    SELECT id FROM pokemons WHERE name = ${pokemon}
`

const selectIdFromAnyType = type => sql`
    SELECT id FROM elements WHERE name = ${type}
`

const join = sql`
    INNER JOIN pokemons_elements AS pe
    ON p.id = pe.pokemon_id
    INNER JOIN elements AS e
    ON e.id = pe.element_id
`

const selectAllInfoFromPokemonsAndElements = (types) => sql`
    SELECT p.list_id, p.name, array_agg(e.name)::text[] AS type
    FROM pokemons AS p
    ${join}
    ${whereTypes(...types)}
    GROUP BY p.list_id, p.name
`

const selectAllTypes = sql`
    SELECT name FROM elements;
`

const selectAllWithJustOneType = sql`
    SELECT p.list_id, p.name, p.level, array_agg(e.name) AS type
    FROM pokemons AS p
    ${join}
    GROUP BY p.list_id, p.name, p.level
    HAVING COUNT(e.name) = 1;
`

const selectDetailsByName = pokemon => sql`
    SELECT p.list_id, p.name, array_agg(e.name)::text[] AS type
    FROM pokemons AS p
    ${join}
    WHERE p.name = ${pokemon}
    GROUP BY p.list_id, p.name
`

const insertNew = (id, name, level) => sql`
    INSERT INTO pokemons (
        list_id, name, level
    ) VALUES (
        ${id}, ${name}, ${level}
    );
`

const insertTypeRelation = (pokemon, type) => console.info('> ', pokemon, type) || sql`
    INSERT INTO pokemons_elements (
        pokemon_id, element_id
    ) VALUES (
        (${selectIdFromAnyPokemon(pokemon)}),
        (${selectIdFromAnyType(type)})
    ) ON CONFLICT DO NOTHING;
`

module.exports = {
    selectAllInfoFromPokemonsAndElements,
    selectAllTypes,
    selectAllWithJustOneType,
    selectDetailsByName,
    insertNew,
    insertTypeRelation,
}