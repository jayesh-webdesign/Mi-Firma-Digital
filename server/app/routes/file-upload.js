const express = require('express');
const router = express.Router();
var multer = require('multer');
var crypto = require("crypto");
var path = require('path');

var app = express();


// File Upload
var DIR = path.join(__dirname,'../uploads');

var storage = multer.diskStorage({
        destination: function(req, file, cb) {
                cb(null, DIR)
        },
        filename: function(req, file, cb) {
                crypto.pseudoRandomBytes(16, function(err, raw) {
                    //     cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname);
                        cb(null, Date.now() + '.' + file.originalname);
            });

        },
        originalname: function(req, file, cb) {
                
                cb(null, file.originalname);
        }
});

var upload = multer({ storage: storage });


// File Upload router
router.post('/upload-certificate', upload.single('file'), function(req, res, next) {

    return res.json({originalname:req.file.originalname, uploadname:req.file.filename});        
});

//  File Download
router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

module.exports = router;