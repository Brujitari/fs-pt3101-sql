const { sql } = require('slonik')
const db = require('../configs/db')

const alterPokemons = async () => {
    await db.transaction(async tx => {
        await tx.query(sql`
            ALTER TABLE pokemons
            RENAME COLUMN id TO list_id;
        `)

        await tx.query(sql`
            ALTER TABLE pokemons
            DROP CONSTRAINT pokemons_pkey CASCADE;
        `)

        await tx.query(sql`
            ALTER TABLE pokemons
            ADD COLUMN id uuid PRIMARY KEY
                DEFAULT uuid_generate_v4();
        `)

        await tx.query(sql`
            ALTER TABLE pokemons_elements
            RENAME
                COLUMN pokemon_id
                TO old_pokemon_id;
        `)

        await tx.query(sql`
            ALTER TABLE pokemons_elements
            ADD COLUMN pokemon_id uuid REFERENCES pokemons
                ON UPDATE CASCADE
                ON DELETE CASCADE;
        `)

        await tx.query(sql`
            ALTER TABLE pokemons_elements
            DROP CONSTRAINT pokemon_element_id;
        `)

        const { ids } = await tx.maybeOne(sql`
            SELECT array_agg(DISTINCT old_pokemon_id) AS ids
            FROM pokemons_elements;
        `)

        for await(const id of ids) {
            await tx.query(sql`
                UPDATE pokemons_elements
                SET pokemon_id = (
                    SELECT id FROM pokemons
                    WHERE list_id = ${id}
                ) WHERE old_pokemon_id = ${id};
            `)
        }

        await tx.query(sql`
            ALTER TABLE pokemons_elements
            ADD PRIMARY KEY(pokemon_id, element_id);
        `)

        await tx.query(sql`
            ALTER TABLE pokemons_elements
            DROP COLUMN old_pokemon_id;
        `)
    })
}

const main = async () => {
    try {
        await alterPokemons()
        console.info('> pokemons table altered!')
        console.info('> pokemons_elements table altered!')
    } catch(error) {
        console.info('[scripts, alterPokemons fn]')
        console.error(error.message)
    }
}

main()