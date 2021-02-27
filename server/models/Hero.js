const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HeroSchema = new Schema (
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
    },
    { autoIndex: true },
)

module.exports = Hero = mongoose.model("Hero", HeroSchema, 'heroes')

