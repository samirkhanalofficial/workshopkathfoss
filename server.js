const express = require('express')
const routess = require('./routers')
const mongo = require('mongoose')
const cors=require('cors')
const { get } = require('express/lib/response')
mongo.connect(process.env.MONGOURL).then(() => {
    console.log("database connected")
}).catch((err) => {
    console.log("error connecting to database")
})
app = express()
app.use(express.json())
app.use(cors("*"))
app.use('/', routess)

app.get('/', (req, res) => {
    res.send("<h2>welcome</h2> <p> welcom to my website </p>")
    res.end()
})
app.get('/favicon.ico', (req, res) => {

    res.sendFile('./assets/favicon.ico')
})
server = app.listen(process.env.PORT, () => console.log("listening on http://" + server.address().address + ":" + server.address().port))