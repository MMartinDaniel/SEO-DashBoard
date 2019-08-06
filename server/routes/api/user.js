const User = require('../../models/User');
const UserSession = require('../../models/UserSession');


module.exports = (app) => {


  app.post('/api/account/signin',(req,res,next)=>{
    const {body} = req;
    let {email,password} = body;
    if(!email){res.end({success:false,message:"Error: Email can't be blank"})};
    if(!password){res.end({success: false, message: ' Error: Email can\'t be blank'})};
    email = email.toLowerCase();

    User.find({ email: email
    },(err,users)=> {
      if (err) {
        return res.end({success:false, message:'Error: Server error'});
      } else if (users.length != 1) {
        return res.send({success:false, message:'Error: Account already exist'});
      }

      const user =  users[0];
      if(!user.validPassword(password)){
        return res.send({
          success:false,
          message:'Error invalid'
        });
      }
      const userSession = new UserSession();
      userSession.userID = user._id;
      userSession.save((err,doc)=>{
        if(err){
          return res.send({
            success:false,
            message:'Error: Server error'
          });
        }
        return res.send({
          success:true,
          message:'Valid Sign in',
          token: doc._id,
          uid: user._id,
        });
      })
    });

  });
  app.get('/api/account/sitemap',(req,res,next)=>{

  });

  app.post('/api/account/signup',(req,res,next)=>{
      const {body} = req;
      console.log('body',body);
      const {password} = body;
      let {email} = body;
      if(!email){res.end({success:false,message:'Error: Missing Email'})};
      if(!password){res.end({success: false, message: ' Error: Mission password'})};

      email = email.toLowerCase();
      email = email.trim();
      User.find({
        email: email
      },(err,previousUsers)=> {
        if (err) {
          return res.end({success:false, message:'Error: Server error'});
        } else if (previousUsers.length > 0) {
          return res.send({success:false, message:'Error: Account already exist'});
        }

        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err,user)=>{
          if(err){
            return res.send({
              success:false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success:true,
            message: 'Signed Up'
          })
        })
      });

  });

  app.put('/api/signin/:id/increment',(req,res,next)=>{
  User.findById(req.params.id)
    .exec()
    .then((user)=>{
      user.password++;
      user.save().then(()=>res.json(user)).catch((err)=>{next(err)});
    }).catch((err)=>next(err));

  });

  app.get('/api/signin',(req,res,next)=>{
    var io = req.app.get('socketio');
    io.emit('news', { hello: 'worldbbxmm' });
     User.find()
    .exec().then((user) => res.json(user))
    .catch((err) => next(err));
  });



  app.post('/api/user/avatar-upload',(req,res,next)=>{
    const {body} = req;
    console.log('body',body);
    const {avatar} = body;

    User.find({
      _id: token,
      isDeleted: false
    },(err,sessions)=>{
      if(err){
        return res.send({
          success:false,
          message: 'Error: Server error'
        });
      }
      if(sessions.length !=1){
        return res.send({
          success:false,
          message:'Error: Invalid'
        });
      }else{
        return res.send({
          success:true,
          message:'Good'
        });
      }
    })
  })

  app.get('/api/account/verify',(req,res,next)=>{
    const { query } = req;
    const { token } = query;
    UserSession.find({
      _id: token,
      isDeleted: false
    },(err,sessions)=>{
      if(err){
        return res.send({
          success:false,
          message: 'Error: Server error'
        });
      }
      if(sessions.length !=1){
        return res.send({
          success:false,
          message:'Error: Invalid'
        });
      }else{
        return res.send({
          success:true,
          message:'Good'
        });
      }
    })
  })

  app.get('/api/account/logout',(req,res,next)=>{

    const { query } = req;
    const { token } = query;


    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    },{
      $set:{isDeleted:true}

    }, null,(err,sessions)=>{
      if(err){
        return res.send({
          success:false,
          message: 'Error: Server error'
        });
      }
        return res.send({
          success:true,
          message:'Good'
        });
      })
    });

  function isAuthenticated(req,res,next){
    if(req.user.authenticated){
      return next;
    }
    res.redirect('/');

  };


};


