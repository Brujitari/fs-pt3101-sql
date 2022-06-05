const upper = str => str.toUpperCase()
const lower = str => str.toLowerCase()
const concat = (str1, str2) => str1.concat(str2)
const join = (arr, arg = '') => arr.join(arg)
const split = (str, separator = ' ') => str.split(separator)
const capitalize = ([first, ...rest]) => concat(upper(first), lower(join(rest)))
const normalizer = str => join(split(str).map(lower), '-').replace('.', '')

const queryCatcher = (fn, place) => async query => {
    try {
        const result = await fn(query)

        return {
            ok: true,
            data: result && result.rows ? result.rows : result,
        }
    } catch(error) {
        place && console.info(`[${place}]`)
        console.error('> ', error.message)

        return {
            ok: false,
        }
    }
}

module.exports = {
    queryCatcher,
    upper,
    lower,
    concat,
    join,
    capitalize,
    split,
    normalizer,
}