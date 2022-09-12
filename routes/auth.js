
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {JWT_SECRET}  = require("../secret")
// const requireLogin = require("../middleware/requireLogin")





router.post("/signup", (req, res) => {
    const {name, email, password} = req.body
    // validations
    if(!email || !password || !name){
        return res.status(400).json({error: "All fields are required"})
    }
    User.findOne({email: email})
        .then((savedUser)=>{

            if(savedUser){
               return res.status(400).json({error: "user already exists"})
            }
            bcrypt.hash(password, 12)
                  .then((hashedPassword)=>{
                      const user = new User({
                          name,
                          email,
                          password: hashedPassword
                      })
                      user.save()
                          .then(
                              (user)=>{
                                  res.json({message: "saved successfully"})
                              }
                          )
                          .catch(()=>{
                              console.log(err)
                          })
                  })
        })
        .catch(()=>{
            console.log(err)
        })
   

})


router.post("/signin", (req, res)=>{
    const {email, password} = req.body
    console.log(req.body)
    if(!email || !password){
        return res.status(400).json({error: "Invalid email or password"})
    }
    User.findOne({email: email})
        .then(
            (savedUser)=>{
                if(!savedUser){
                    return res.status(400).json({error: "!!! Invalid email or password !!!!"})
                }
                bcrypt.compare(password, savedUser.password)
                      .then((doMatch)=>{
                          if(doMatch){
                              const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                           
                              return res.json({message: "You signed in successfully", token: token})
                          }
                          else{
                            return res.send.status(400).json({error: "Invalid email or password"})
                          }
                      })
            }
        )
})

// router.get("/topsecret",requireLogin, (req, res)=>{
//     res.send("u are in top secret chat")
// })
// 
 module.exports = router