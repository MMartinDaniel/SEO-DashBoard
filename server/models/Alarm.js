var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var alarmSchema = new Schema({
    id: { type:String,required: true},
    hour:{type: Number, required:true},
    type:{type:String, required: false},
    minute:{type:Number,required:false},
    active:{type:Boolean, required:false},
    uid:{type:String,required:false},
    lastExecuted:{type:Date,required:false},
});


module.exports = mongoose.model('Alarm',alarmSchema);
