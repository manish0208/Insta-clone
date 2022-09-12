// app.js  extra code

//  
//  const express = require("express")
//  const app = express()
//  const port = 4444
//  
//  const customMiddleware = (req, res, next) => {
//      console.log("hello i am a middleware")
//      next()
//  }
//  
//  //app.use(customMiddleware)
//  
//  app.get('/', function(req, res){
//      res.send('Hello World')
//  })
//  
//  app.get("/blog/", customMiddleware,
//  (req, res) => {res.send("blog page")}
//  )
//  
//  
//  
//  app.listen(port, ()=>{console.log(`server is running at port ${port}`)})