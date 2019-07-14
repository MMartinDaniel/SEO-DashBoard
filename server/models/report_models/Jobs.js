var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
    id: {type: String, required: true},
    uid: {type: String, required: true},
    start_date:{type:Date,required:true},
    website:{type:String,required:true},
});

module.exports = mongoose.model('job',jobSchema);