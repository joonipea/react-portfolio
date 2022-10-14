const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");



router.get("/getposts", (req, res, next) => {
    Blog.find().then((posts) => {
        res.send(posts);
    });
});

router.post("/addpost", (req, res, next) => {
    const post = new Blog({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
    });
    post.save().then(result => {
        res.send(result)
    })
});

module.exports = router;