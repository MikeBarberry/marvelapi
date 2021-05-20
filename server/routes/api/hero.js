const express = require("express")
const router = express.Router()

const Hero = require("../../models/Hero")

router.post("/index", (req, res) => {
    Hero.find((err, heroes) => {
        if (err) return console.error(err);
        res.json(heroes);
    })
})

router.post("/add", (req, res) => {
    const payload = req.body
    const hero = new Hero({
        name: payload.name, 
        description: payload.description, 
        thumbnail: payload.thumbnail
    })
    hero.save((err, hero) => {
        if (err) return console.error(err);
        res.json(hero)
    })
})

router.post('/getThumbnail', (req, res) => {
    const payload = req.body
    Hero.findById(payload.hero_id, function (err, hero) {
        if (err) return console.error(err);
        res.json(hero);
    })
})

router.post('/edit', (req, res) => {
    const payload = req.body
    const updateHero = {
        description: payload.description,
        thumbnail: payload.thumbnail
    }
    Hero.findByIdAndUpdate(payload.hero_id, updateHero, { new: true }, (err, hero) => {
        if (err) return console.error(err);
        res.json(hero);
    })
})

router.post('/delete', (req, res) => {
    const payload = req.body
    Hero.deleteOne({ _id: payload.hero_id }, (err, hero) => {
        if (err) return console.error(err);
        res.json(hero);
    })
})

module.exports = router 

