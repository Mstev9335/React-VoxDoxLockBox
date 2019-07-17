const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Proj = new Schema({
    proj_title: {
        type: String
    },
    proj_description: {
        type: String
    }, 
    proj_URL: {
        type: String
    }
});

module.exports = mongoose.model('Proj', Proj)