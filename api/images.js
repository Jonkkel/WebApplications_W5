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

router.post("", upload.array('image',10), (req, res, next) => {
    let data = [];
    //console.log(req.files)
    for (var file of req.files){
        Image.findOne({ name: file.originalname}, (err, image) => {
            if(err);
            if(!image){
                new Image({
                    name: file.originalname,
                    buffer : file.buffer,
                    mimetype : file.mimetype,
                    encoding : file.encoding
                }).save((err) =>{
                    if(err) next(err);
                });
            }
        });
    }

    Image.find({}, (err, image) => {
        
        if(err) return next(err);
        if(image) {
            return res.json(image);
        } else {
            return res.status(404).send("Not found");
        }
    })
})


module.exports = router;