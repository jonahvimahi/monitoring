const express = require("express")
const path = require('path')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(4545, () => console.log('we are up and running on 4545'))