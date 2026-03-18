import express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Api Health')
})

router.get('/health', (req, res) => {
    res.send('Api Health')
})

module.exports = router