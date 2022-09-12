
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const requireLogin  = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


router.get('/allpost', requireLogin, (req, res)=>{
    Post.find()
        .populate("postedBy", "_id name")
        .then((posts)=>{
            res.json({posts})
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.post("/createpost",requireLogin, (req, res)=>{
    const {title, body} = req.body
    if(!title || !body){
        return res.status(400).json({error: "All fields are required"})
    }

    const post = new Post({
        title,
        body,
        postedBy: req.user
    })
    post.save()
        .then((savedPost)=>{
            res.json({message: "post created ", post: savedPost})
        })
        .catch((err)=>{
            console.log(err)
        })
})


router.get("/postbyme", requireLogin, (req, res)=>{
    Post.find({postedBy: req.user._id})
        .then((mypost)=>{
            res.json({mypost})
        })
        .catch((err)=>{
            console.log(err)
        })
})


module.exports = router