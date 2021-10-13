const express = require("express")
const multer  = require('multer')
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const Category = require("../models/Category");
const Image = require("../models/Image");
const router = express.Router();
const fs = require("fs");
const { connect } = require("http2");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("", upload.array('image', 10), (req, res, next) => {
    for (let i = 0; i< req.files.length; i++){
        new Image({
            name: req.files[i].originalname,
            buffer : req.files[i].buffer,
            mimetype : req.files[i].mimetype,
            encoding : req.files[i].encoding
        }).save((err, doc) => {
            if (err) next(err);
            console.log("jee")
            console.log(req.body.name);

            Recipe.findOne({ name: req.body.name}, (err, recipe) => {
                if(err) return next(err);
                if(recipe){
                    console.log(doc._id);
                    recipe.images.push(doc._id);
                    recipe.save((err) => {
                        if (err) next(err);
                    });
                }else{
                    return res.status(403).send("HUUH sick error");
                }
        });
    });
    }
    return res.send("gg");
})

module.exports = router;