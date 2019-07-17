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
const db = require('./proj.model');

let Proj = require('./proj.model');

let userInput;
let location;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// bodyParser for upload
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({}).any());


// amazon s3 config
dotenv.config();
aws.config.update({
  
});

mongoose.connect('mongodb://localhost:27017/projects', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MONGO PLUG IN REAL GOOD")
})

projRoutes.route('/').get(function (req, res) {
    Proj.find(function (err, projs) {
        if (err) {
            console.log(err);
        } else {
            res.json(projs);
        }
    });
});

projRoutes.route('/add').post(function (req, res) {
    // //  mongoDB
    // console.log(req.body);
    // let proj = new Proj({
    //     proj_title: req.body.proj_title,
    //     proj_description: req.body.proj_description,

    // });
    // console.log(proj);
    // proj.save()
    //     .then(proj => {
    //         res.status(200).json({ 'project': 'added successfully' });
    //     })
    //     .catch(err => {
    //         res.status(400).send('adding new failed');
    //     })

    // amazon s3
    const s3 = new aws.S3();

    userInput = req.body;
    // console.log(userInput);

    let file = req.files[0];
    let test = file.buffer;

    // bucket parameters
    let params = {
        Bucket: 'voxdox',
        ACL: 'public-read',
        Body: test,
        Key: file.originalname,
    };


    // s3 upload function
    s3.upload(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } if (data) {
            console.log("Upload Success", data.Location);
            location = data.location;
            console.log(location);
            let proj = new Proj({
                proj_title: userInput.proj_title,
                proj_description: userInput.proj_description,
                // proj_URL: data.location
            });
            console.log(proj);
           
            proj.save()
        .then(proj => {
            res.status(200).json({ 'project': 'added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new failed');
        })
        }
    });


})

projRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Proj.findById(id, function (err, response) {
        res.json(response);
    })
})

app.use('/projs', projRoutes);

app.listen(PORT, function () {
    console.log("connected to port: " + PORT);
})