const axios = require('axios')
const { API_URL } = require('../constants')

const client = axios.create({
    baseURL: API_URL,
})

module.exports = client