const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Music = new Schema({
    title: {
        type: String,
        default: "",
    },
    artist: {
        type: String,
        default: "",
    },
    album: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    url: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    tags: {
        type: Array,
        default: [],
    },
});

const myDB = mongoose.connection.useDb("music");
module.exports = myDB.model("Music", Music);
