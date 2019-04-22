const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
  const user = await User.findById(id);
  done(null,user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req,email,password,done)=> {

  req.checkBody('email','Invalid Email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:4});
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null,false,req.flash('error',messages));
  };

  const user = await User.findOne({email:email});
  if(user){
    return done(null,false,{message: 'The email is already taken.'});
  }else{
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    done(null,newUser);
  }
}));

passport.use('local-signin',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},async(req,email,password,done)=>{

  req.checkBody('email','Invalid Email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:4});
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null,false,req.flash('error',messages));
  };

  const user = await User.findOne({email: email});
  if(!user){
    return done(null,false,{message:'User not found'});
  }
  if(!user.validPassword(password)){
    return done(null,false,{message:'Incorrect password'});
  }

  done(null,user);
}));
