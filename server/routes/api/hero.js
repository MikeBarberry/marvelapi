const express = require("express")
const router = express.Router()

const Hero = require("../../models/Hero")

router.post("/hero_list", function (req, res) {
    Hero.find(function (err, heroes) {
        if (err) return console.error(err);
        res.json(heroes);
        }
    )
})

router.post("/add_hero", function (req, res) {
    const payload = req.body
    Hero.create({ name: payload.name, description: payload.description, thumbnail: payload.thumbnail }, function (err, small) {
        if (err) return handleError(err);
    });  
})

router.post('/getThumbnail', function (req, res) {
    const payload = req.body
    Hero.findById(payload.hero_id, function (err, hero) {
        if (err) return console.error(err);
        res.json(hero);
        }
    )
})

router.post('/edit', function (req, res) {
    const payload = req.body
    Hero.updateOne({ 
        _id: payload.hero_id 
        }, 
        {
        description: payload.description,
        thumbnail: payload.thumbnail
        }, 
        function (err,hero) {
        if (err) return handleError(err);
        }
    )
})

router.post('/delete', function (req, res) {
    const payload = req.body
    Hero.deleteOne({ _id: payload.hero_id }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
    })
})

module.exports = router 

