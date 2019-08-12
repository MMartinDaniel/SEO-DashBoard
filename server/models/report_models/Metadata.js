
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var metadataSchema = new Schema({
    id: {type: String, required: true},
    wordCloud:{type:[],required:false},
    favicon: {type:[],required:false},
    description: {type:String,required:false},
    keywords: {type:[],required:false},
    title: {type:[],required:false},
    meta:{type:[],required:false},

});

module.exports = mongoose.model('metadata',metadataSchema);
