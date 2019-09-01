const User = require('../../models/User');
const Alarm = require('../../models/Alarm');
const UserSession = require('../../models/UserSession');
const multer = require("multer");
const Report_Generator = require("../../models/Report_task");
const Report = require("../../models/Report");
const fetch = require('node-fetch');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './client/public/assets/img/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, req.body.uid + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

function checkifJob() {
  Alarm.find({}, function(err, alarms) {
    var d = new Date();
    var m = d.getMinutes();
    var h = d.getHours();
    alarms.forEach(function(alarm) {
      if(alarm.minute === m && alarm.hour === h && alarm.active === true){
          let report_data = null;
          console.log("report:");
          console.log(alarm.id);
          Report.findOne({ id: alarm.id }).exec((err,report)=> {
            console.log("report:");
            if (err) {
            } else if (report.length !== 1) {
              report_data = {web:report.website,uid:report.user,options:report.options};
              let diff = alarm.lastExecuted - d;
              let execute = false;
              var DaysDiff_i = (diff / (1000 * 3600 * 24)).toFixed(3);
              console.log(DaysDiff_i);
              if(alarm.lastExecuted === null){
                console.log("executing first time....");
                execute = true;
              }else if(alarm.type === "Monthly" && DaysDiff_i <= -30.00 ){
                console.log("executing monthly...");
                execute = true;
              }else if(alarm.type === "Weekly" && DaysDiff_i <= -7.00){
                console.log("execting weekly...");
                execute = true;

              }else if(alarm.type === "Daily" && DaysDiff_i <= -1.00){
                console.log("Executing Daily...");
                execute = true;
               }
               
               if(execute){
                Alarm.findOneAndUpdate({id:alarm.id}, { lastExecuted: Date() }, {new: true}, function(err, alarms) {});
                console.log(report_data);
                fetch('http://localhost/library/fullReport_alarm',{
                  method:'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    web:report_data.web,
                    uid:report_data.uid,
                    options:report_data.options,
                    id:report.id
                  })
                  })
               }
               execute = false;

            };
          });
        

      }
    });

  });

}
setInterval(checkifJob, 10000); 



module.exports = (app) => {

  app.post('/api/account/profileData',upload.single("img"),(req,res,next)=>{
    const {body} = req;
    const {uid,fullname,subtitle} = body;
    User.findOneAndUpdate({_id: uid}, { image: uid+req.file.originalname, name:fullname,subtitle:subtitle }, {new: true}, (err, user) => {
      console.log(user);
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (user.length != 1) {

        return res.send({success:true, message:'Success, Report found',data:user});
      }
  });
  

  });
  app.post('/api/account/profileName',(req,res,next)=>{
    console.log("calling here");
    console.log(req.body);
    const {body} = req;
    const {uid,fullname,subtitle} = body;
    User.findOneAndUpdate({_id: uid}, {name:fullname,subtitle:subtitle }, {new: true}, (err, user) => {
      console.log(user);
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (user.length != 1) {

        return res.send({success:true, message:'Success, Report found',data:user});
      }
  });
  

  });
  
  app.post('/api/account/alarm/',(req,res,next)=>{
    console.log(req.body);
    const {body} = req;
    const {id,uid,hour,minute,type,onoff} = body;
    Alarm.findOneAndUpdate({id: id}, {uid:uid,hour:hour,minute:minute,type:type,active:onoff }, {new: true}, (err, alarm) => {
      console.log(alarm);
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (alarm !== null && alarm.length != 1) {
        return res.send({success:true, message:'Success, Report found',data:alarm});
      }
      
      const newAlarm = new Alarm();

      newAlarm.id = id;
      newAlarm.uid = uid;
      newAlarm.hour = hour;
      newAlarm.type = type;
      newAlarm.active = onoff;
      newAlarm.minute = minute;
      newAlarm.lastExecuted = '';
      newAlarm.save((err,doc)=>{
        if(err){
          return res.send({
            success:false,
            message:'Error: Server error'
          });
        }
        return res.send({
          success:true,
          message:'Valid creating',
          data: ''
        });
      })


   });
  });

  app.get('/api/account/alarm',(req,res,next)=>{
    console.log(req.body);
    const { query } = req;
    let {id} = query;
    Alarm.findOne({id: id}, (err, alarm) => {
      console.log(alarm);
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (alarm !== null && alarm.length != 1) {
        return res.send({success:true, message:'Success, Alarm found',data:alarm});
      }
   });
  });




  app.delete('/api/account/alarm/:id',(req,res,next)=>{

    const { id } = req.params;

    Alarm.remove({ id: id }, function(err) {
      if (!err) {
      }else {
        return res.send({success:true,message: "Error: Server Error",});
      }
  });
  });
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
  app.post('/api/account/userData',(req,res,next)=>{
    const {body} = req;
    const {uid} = body;
    
    User.find({
      _id: uid
    },(err,user)=> {
      if (err) {
        return res.end({success:false, message:'Error: Server error'});
      } else if (user.length > 0) {
        return res.send({success:true, message:'Server: OK',data:user});
      }

    });
  });


/*
  
  app.post('/api/account/profileData',(req,res,next)=>{
    const {body} = req;
    console.log(body);
    const {uid,fullname,subtitle,img} = body;
    console.log({img:img,fullame:fullname, subtitle:subtitle});
    User.findOneAndUpdate({_id: uid}, {image:img, name:fullname,subtitle:subtitle }, {new: true}, (err, user) => {
      console.log(user);
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (user.length != 1) {

        return res.send({success:true, message:'Success, Report found',data:user});
      }
  });

  });

*/
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
        newUser.image = "";
        newUser.name = "";
        newUser.subtitle = "";
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
