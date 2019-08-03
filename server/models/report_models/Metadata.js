
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
/*
"title": {
    "data": "Instantes | Web de Antonio Martínez Corral",
    "count": 2,
    "status": "success",
    "errors": ""
    },
    "keywords": {
    "data": "Keywords meta tag not found on website or is empty",
    "count": 0,
    "status": "success",
    "errors": ""
    },
    "favicon": {
    "data": [
      {
    "name": "icon",
    "href": "https://instantes.net/blog/wp-content/uploads/2016/02/cropped-logo_instantes_notexto_512-32x32.png"
    },
      {
    "name": "icon",
    "href": "https://instantes.net/blog/wp-content/uploads/2016/02/cropped-logo_instantes_notexto_512-192x192.png"
    },
      {
    "name": "apple-touch-icon-precomposed",
    "href": "https://instantes.net/blog/wp-content/uploads/2016/02/cropped-logo_instantes_notexto_512-180x180.png"
    }
    ],
    "count": 21,
    "status": "success",
    "errors": ""
    },
    "description": {
    "data": "Blog personal de Antonio Martínez Corral. Fotografía, algo de música y reflexiones.",
    "count": 1,
    "status": "success",
    "errors": ""
    },
    "cloud": {
    "data": [
      {
    "name": "/>",
    "value": 241
    },
      {
    "name": "src="https://instantes.net/blog/wp-content/plugins/collapsing-category-list//images/nothing.gif"",
    "value": 176
    },
      {
    "name": "width="9px"",
    "value": 176
    },
      {
    "name": "height="9px"",
    "value": 176
    },
      {
    "name": "<img",
    "value": 109
    }
    ],
    "status": "success",
    "errors": ""
    },
    "status": "success",
    "errors": ""
    }
    */