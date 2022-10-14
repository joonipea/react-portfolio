const mongoose = require("mongoose")
const Schema = mongoose.Schema



const Post = new Schema({
    title: {
        type: String,
        default: "",
    },
    content: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    },
})


const myDB = mongoose.connection.useDb("blog")
module.exports = myDB.model("Post", Post)
