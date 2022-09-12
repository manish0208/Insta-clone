const express = require("express")
const app = express()
const mongoose = require('mongoose')
const {MONGOURL} = require("./secret.js")
require("./models/user")
require("./models/post")
const port = 4444


mongoose.connect(MONGOURL)

// for true case
mongoose.connection.on("connected",
    ()=>{console.log("connected to mongoDB")}
)

// for false case
mongoose.connection.on("error",
    (err)=>{console.log("Error connecting to mongoDB"), err}
)

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))



app.get('/', function(req, res){
    res.send('Hello World')
})


app.listen(port, ()=>{console.log(`server is running at port ${port}`)})