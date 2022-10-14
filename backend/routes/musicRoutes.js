const express = require("express");
const router = express.Router();
const Music = require("../models/music");


router.get("/getMusic", (req, res, next) => {
    Music.find().then((songs) => {
        res.send(songs);
    });
});

router.post("/addSong", (req, res, next) => {
    const song = new Music({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        date: req.body.date,
        url: req.body.url,
        image: req.body.image,
        description: req.body.description,
        tags: req.body.tags
    });
    song.save().then(result => {
        res.send(result)
    })
});

module.exports = router;