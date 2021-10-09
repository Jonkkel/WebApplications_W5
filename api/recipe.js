const express = require("express")
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const router = express.Router();
const fs = require("fs");

let food = "";
router.get("/:food", (req, res) => {
    food = req.params.food;
    res.json({name: food,
        ingredients: ["50g porridge oats", "350ml milk or water, or a mixture of the two","Greek yogurt, thinned with a little milk and clear honey, to serve."],
        instructions: ["Put 50g porridge oats in a saucepan, pour in 350ml milk or water and sprinkle in a pinch of salt.","Bring to the boil and simmer for 4-5 minutes.",
    "watch carefully that it doesn’t stick to the bottom of the pan.","Pour into bowls, spoon Greek yogurt, thinned with a little milk, on top and drizzle with honey."]});
})

router.post("/", (req, res) => {
    Recipe.findOne({ name: req.body.name}, (err, name) => {
        if(err) return next(err);
        if(!name){
            new Recipe({
                name: req.body.name,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions
            }).save((err) =>{
                if(err) return next(err);
                return res.json(req.body);
            });
        }else{
            return res.status(403).send("Already has that recipe!");
        }
    });
    //res.json(req.body);
})

/*
router.get("/", (req, res) => {
    fs.readFile('./data/new_recipe.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.send(JSON.stringify(obj));
      });
    console.log("recipe: sent!");
})
*/

module.exports = router;