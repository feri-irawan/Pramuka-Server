const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

require('dotenv').config()

const {loadContents, addContent, deleteAllContents} = require('./utils/materi')
const {checkApiKey} = require('./utils/auth')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        status: 200,
        title: 'Pramuka API',
        description: 'API untuk website https://pramuka.vercel.app',
    })
})

app.get('/loadContents', (req, res) => {
    res.json({
        status: 200,
        title: 'Pramuka API',
        description: 'Kumpulan konten',
        data: loadContents(),
    })
})

app.post('/addContent', (req, res) => {
    const {apiKey} = req.body
    if (!checkApiKey(apiKey)) {
        res.json({
            status: 401,
            title: 'Pramuka API',
            description: 'API key tidak valid!',
        })
        return
    }

    res.json({
        status: 200,
        title: 'Pramuka API',
        description: 'Berhasil menambahkan materi baru.',
        data: addContent(req.body),
    })
})

app.delete('/deleteAllContents', (req, res) => {
    deleteAllContents()
    res.send({
        status: 200,
        message: 'All data has been deleted!',
    })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})
