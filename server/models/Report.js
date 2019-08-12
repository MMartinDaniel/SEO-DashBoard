var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new Schema({

    id: {type: String, required: true},
    email: { type:String,required: true},
    user: {type: String,required:false},
    password:{type: String, required:false},
    website:{type:String, required: true},
    htag: {type:[],required: false},
    performance:{type:[],required:false},
    brokenLinks:{type:[],required:false},
    sitemap: {type:{},required:false},
    webshot:   {type:mongoose.Schema.Types.ObjectId, ref: 'WebShot',required:false},
    ssl:       {type:mongoose.Schema.Types.ObjectId, ref: 'Ssl',required:false},
    metadata: {type:mongoose.Schema.Types.ObjectId, ref: 'metadata',required:false},
    imgAlt:{type:[],required:false},
    resources:{type:[],required:false},
    date:{type:Date,require:false},
    minify:{type:[],required:false},
    options:{type:[],required:false},
    headers:{type:[],required:false},
    views:{type:Number,required:false},

});

module.exports = mongoose.model('Report',reportSchema);

