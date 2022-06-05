const { sql } = require('slonik')
const db = require('../configs/db')
const { normalizer } = require('../utils/commons')

const alterLeaders = async () => {
    await db.query(sql`
        ALTER TABLE IF EXISTS leaders
        ADD COLUMN IF NOT EXISTS slug TEXT;
    `)
}

const updateLeaders = async () => {
    const { rows: leaders } = await db.query(sql`
        SELECT * FROM leaders;
    `)

    await db.transaction(async tx => {
        for await(const leader of leaders) {
            await tx.query(sql`
                UPDATE leaders
                SET slug = ${normalizer(leader.name)}
                WHERE id = ${leader.id}
            `)
        }
    })
}

const main = async () => {
    try {
        await alterLeaders()
        await updateLeaders()
        console.info('> leaders table altered!')
    } catch(error) {
        console.info('[scripts, alterLeaders fn]')
        console.error(error.message)
    }
}

main()