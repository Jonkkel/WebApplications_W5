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

router.post("", upload.array('image'), (req, res, next) => {
    for (var file of req.files){
        Image.findOne({ name: file.originalname}, (err, image) => {
            if(err) next(err);;
            if(!image){
                new Image({
                    name: file.originalname,
                    buffer : file.buffer,
                    mimetype : file.mimetype,
                    encoding : file.encoding
                }).save((err) =>{
                    if(err) next(err);
                    return res.send(req.body);
                });
            }else{
                return res.send(req.body);
            }
        });
    }
})

module.exports = router;