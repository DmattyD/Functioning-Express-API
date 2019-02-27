const express = require('express')
const app = express()
const port = 4000
const monk = require('monk')
const url = 'mongodb://mddever:Password@cluster0-shard-00-00-hiisr.gcp.mongodb.net:27017,cluster0-shard-00-01-hiisr.gcp.mongodb.net:27017,cluster0-shard-00-02-hiisr.gcp.mongodb.net:27017/Practice?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const db = monk(url);
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json())

db.then (() => {
    console.log('Conected to server')})

const products = db.get('things')

app.get('/',  async (req, res) => {
    const results =  await products.find()
    res.status(200).send(results)});

// app.post('/', async (req, res) => {
//     const result = await products.insert(req.body)
//     res.status(200).send(result)
// })

app.listen(port, () => console.log(`Express is listening on port ${port}`))
// console.log uses backticks, not quotes.