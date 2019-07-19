// dependencies
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const projRoutes = express.Router();
const PORT = 2112;
const fileUpload = require("express-fileupload");
var multer = require('multer')
const aws = require('aws-sdk');
const dotenv = require('dotenv');

let Proj = require('./proj.model');

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// amazon s3 config
dotenv.config();
aws.config.update({
    accessKeyId: "AKIATXD362LLCPJJCT67",
    secretAccessKey: "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"
});

// multer
var upload = multer({ storage: storage }).single('file');


mongoose.connect('mongodb://localhost:27017/projects', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MONGO PLUG IN REAL GOOD")
})

projRoutes.route('/').get(function (req, res) {
    Proj.find((err, projs) => {
        if (err) {
            console.log(err);
        } else {
            res.json(projs);
        }
    });
});

projRoutes.route('/add').post(function (req, res) {

    let proj = new Proj(req.body);
    proj.save()
        .then(proj => {
            res.status(200).json({ 'project': 'added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new failed');
        })

    // // amazon s3
    const s3 = new aws.S3();
    upload(req, res, function (err) {

        //    req.file is the file itself
        // console.log(req.files.file.data);
        // console.log(req.files.file.name);
        // get file
        let file = req.files.file.data;
        // get file name
        let fName = req.files.file.name;
 
        // bucket parameters
        let params = {
            Bucket: 'voxdox',
            ACL: 'public-read',
            Body: file,
            Key: fName,
        };

        // s3 upload function
        s3.upload(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } if (data) {
                console.log("Upload Success", data.Location);
            }
        });
        // mongoDB
    })

})

// projRoutes.route('/edit/:id').get(function (req, res) {
//     let id = req.params.id;
//     Proj.findById(id, function (err, response) {
//         res.json(response);
//     })
// })

app.use('/projs', projRoutes);

app.listen(PORT, function () {
    console.log("connected to port: " + PORT);
})