var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: { type:String,required: true},
    password:{type: String, required:true},
    website:{type:String, required: false},
    reports:{type:[],required:false},
    name:{type:String, required:false},
    repcounter:{type:Number,required:false},
    receivedreports:{type:[],required:false},
    image:{type:String,required:false}
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5,null));
};
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};
module.exports = mongoose.model('User',userSchema);
