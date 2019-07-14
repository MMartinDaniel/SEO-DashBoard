
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var webshotSchema = new Schema({
    id: {type: String, required: true},
    tabletPic: {type:String,required:true},
    phonePic: {type:String,required:true},
    desktopPic: {type:String, required:true}
});

module.exports = mongoose.model('WebShot',webshotSchema);

