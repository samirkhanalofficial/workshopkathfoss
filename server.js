const express = require('express')
const routess = require('./routers')
const mongo = require('mongoose')
mongo.connect("mongodb://localhost:27017/workshop").then(() => {
    console.log("database connected")
}).catch((err) => {
    console.log("error connecting to database")
})

// test 123
//end of line
//test 122
app = express()
app.use(express.json())
app.use('/', routess)
port = process.env.PORT
server = app.listen(port, () => console.log("listening on http://" + server.address().address + ":" + server.address().port))