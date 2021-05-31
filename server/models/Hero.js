const mongoose = require("mongoose")
const Schema = mongoose.Schema

const { nanoid } = require('../config/nano')

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
        shortID: {
            type: String,
            default: () => nanoid()
        }
    },
    { autoIndex: true },
)

module.exports = Hero = mongoose.model("Hero", HeroSchema, 'heroes')

