const brokenLinkTester = require('../../models/SiteMapGenerator');
const webshot = require('../../models/webshot');
const report = require('../../models/Report_task');
const fs = require('fs');
const path = require('path');
const Report = require('../../models/Report');
const Job = require ('../../models/report_models/Jobs');
const User = require("../../models/User");
var nodemailer = require('nodemailer');
const Spellcheck = require("../../models/SpellCheck");
var transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user: 'staticautoreply@gmail.com',
    pass: 'autoreply123'
  }
});

module.exports = (app) => {

  app.post('/library/fullReport', async (req,res,next)=>{
      const {body} = req;
      const data = await report.generateReport(body,req);
      res.send({response:true,data:data});
  });

  app.post('/library/fullReport_alarm', async (req,res,next)=>{
    const {body} = req;
    const data = await report.generateReport_alarm(body,req);
    res.send({response:true,data:data});
});

  app.post('/library/spellcheck', async (req,res,next)=>{
    const {body} = req;
    const { url,hash,excluded_words } = body;

    console.log(body);
    const data = await Spellcheck.checkSpelling(url,req,hash,excluded_words);
    res.send({response:true,data:data});
});

  app.get('/library/user/Report/increaseCounter/:id',(req,res,next)=>{
    const { id } = req.params;
    console.log("Updating:"+id);
    Report.findOneAndUpdate({id: id}, {$inc:{views:1}}, {new: true}, (err, report) => {
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (report !== null && report.length !== 1) {
        return res.send({success:true, message:'Success, Report found',data:report});
      }
  });

  });

  app.get('/library/user/Report/:id',(req,res,next)=>{
    const { id } = req.params;
    console.log(id);
    var populateQuery = [{path:'metadata'},{path:'ssl'},{path: 'webshot'}];
    Report.findOne({ id: id }).populate(populateQuery).exec((err,report)=> {
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (report !== null && report.length !== 1) {
        return res.send({success:true, message:'Success, Report found',data:report});
      };
  
  })});

  app.get('/libraries/seenReport',(req,res,next)=>{
    const { id } = req.query;
    console.log(id);
    Report.findOne({ id: id }).exec((err,report)=> {
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (report !== null && report.length!== 1) {
        return res.send({success:true, message:'Success, Report found',data:report.viewedby});
      };
    })
  });
  app.get('/libraries/AsignedReport',(req,res,next)=>{
    const { id } = req.query;
    console.log(id);
    Report.findOne({ id: id }).exec((err,report)=> {
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (report !== null && report.length!== 1) {
        return res.send({success:true, message:'Success, Report found',data:report.asignedUsers});
      };
    })
  });

  app.post('/libraries/seeReport',(req,res,next)=>{
    const { email,id } = req.body;
    Report.update({ id: id },{ $addToSet: { viewedby: email }}, function(err){
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (report !== null && report.length !== 1) {
        return res.send({success:true, message:'Success, Report found',data:report});
      };
  
  })});

  app.post('/libraries/AsignReport',(req,res,next)=>{
    const { email,id } = req.body;
    Report.update({ id: id },{ $addToSet: { asignedUsers: email }}, function(err,report){
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (report !== null && report.length !== 1) {
        return res.send({success:true, message:'Success, Report found',data:[]});
      };
  
  })});


  app.delete ('/libraries/AsignReport',(req,res,next)=>{
    const {body} = req;
    const {email,id} = body;  
    Report.update( { id: id }, { $pull: { asignedUsers:  email  } }, function(err){
      if (err) {
        return res.send({success:true,message: "Error: Server Error",});
      }else {
        return res.send({success:true,message: "Success: Removed",data:[]});
      }
    } )
  });


  app.post('/library/user/sendallmail',(req,res,next)=>{
    const {body} = req;
    const {uid} = body;   

    User.findById(uid, function (err, user) { 
      if(err){
        console.log(err);
      }else if( user !== null && user.length != 1 ){
        console.log("user:"+user.email);
        user.reports.forEach(informe => {
          console.log('informe:' + informe);
          Report.findOne({ id: informe }).exec((err,report)=> {
            if(err){

            }else if(report !== null && report.length != 1){
              report.asignedUsers.forEach(rep_user=>{

                    let from = {website:report.website,id: report.id,uid: user.uid, date: Date.now(),email:user.email};
                      User.update( { email: rep_user }, { $addToSet: { receivedreports: from }}, function(err) {
                        if (err) {
                          return res.send({success:true,message: "Error: Server Error",});
                        }
                    });
                    var mailOptions = {
                      from: 'staticautoreply@gmail.com',
                      to: rep_user,
                      subject: 'Te ha enviado un informe',
                      html: "Se ha enviado un informe para su revision para la web  " +report.website + ", accede con el siguiente enlace <a href='http://localhost:8080/Report/"+report.id+"?email="+rep_user+"'>Enlace</a>",
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                      }
                    });
              })
              
            }

          });
        });
      }
    });


  return res.send({success:true,message: "Success: sent",});
  });




  app.post('/library/user/email',(req,res,next)=>{
    const {body} = req;
    const {email,id,uid,website,own} = body;   
    console.log(body);
    let from = {website:website,id:id,uid:uid, date: Date.now(),email:own};
    User.update( { email: email }, { $addToSet: { receivedreports: from }}, function(err) {
      if (err) {
        return res.send({success:true,message: "Error: Server Error",});
      }
   });
   var mailOptions = {
    from: 'staticautoreply@gmail.com',
    to: email,
    subject: 'Te ha enviado un informe',
    html: "Se ha enviado un informe para su revision para la web  " +website + ", accede con el siguiente enlace <a href='http://localhost:8080/Report/"+id+"?email="+email+"'>Enlace</a>",
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return res.send({success:true,message: "Success: sent",});
  });


  app.get('/library/user/onProgress',(req,res,next)=>{
    const { uid } = req.query;
    //,{website:true}).populate({path:'metadata'}
    Job.find({uid: uid}).exec((err,jobs)=>{
      if(err){
        return res.send({success:false,message:"Error: Server error",data:[]});
      }else if( jobs.length > 0){
        return res.send({success:true,message: "Success: Data found", data:jobs});
      }else if(jobs.length == 0){
        return res.send({success:true,message:"No matching data",data:[]});
      }
    });
  });
  
  app.get('/library/user/word',(req,res,next)=>{
    const { uid } = req.query;
    console.log(uid);

    User.find({_id: uid},{excluded_words:true}).exec((err,user)=>{
      console.log(user[0].excluded_words);
      if(err){
        return res.send({success:false,message:"Error: Server error",data:[]});
      }else if( user[0].excluded_words.length > 0){
        return res.send({success:true,message: "Success: Data found", data:user[0].excluded_words});
      }
    });
  });
  app.delete ('/library/user/word',(req,res,next)=>{
    const {body} = req;
    const {word,uid} = body;  
    console.log(uid);
    console.log(word); 
    User.update( { _id: uid }, { $pull: { excluded_words:  word  } }, function(err){
      if (err) {
        return res.send({success:true,message: "Error: Server Error",});
      }else {
        return res.send({success:true,message: "Success: Removed",});
      }
    } )
  });

  app.delete ('/library/user/received',(req,res,next)=>{
    const {body} = req;
    const {id,uid} = body;  
    console.log(id,uid);
    User.update( { _id: uid }, { $pull: { 'receivedreports':  { id: id }   } }, { safe: true, upsert: true }, function(err){
      if (err) {
        console.log(err);
        return res.send({success:true,message: "Error: Server Error",});
      }else {
        return res.send({success:true,message: "Success: Removed",});
      }
    } )
  });

  app.post ('/library/user/word',(req,res,next)=>{
    const {body} = req;
    const {word,uid} = body;   
    console.log("Received: " + word  + " uid: " + uid );
    User.update( { _id: uid }, { $addToSet: { excluded_words: word }}, function(err) {
      if (err) {
        return res.send({success:true,message: "Error: Server Error",});
      }else {
        return res.send({success:true,message: "Success: Added",});
      }
    } )
  });
 
  app.delete('/library/user/report/:id',(req,res,next)=>{
   
    const { id } = req.params;
    const {uid} = req.body;
    Report.remove({ id: id }, function(err) {
      if (!err) {
      }else {
        return res.send({success:true,message: "Error: Server Error",});
      }
   });

  return  User.update( { _id: uid }, { $pull: { 'reports':  { id: id }   } }, { safe: true, upsert: true }, function(err){
    if (err) {
      console.log(err);
      return res.send({success:true,message: "Error: Server Error",});
    }else {
    }
  } ).then(() => {
    return res.send({success:true,message: "Success: Removed",});

  })


  });

  app.delete('/library/user/jobs/:id',(req,res,next)=>{
    const { id } = req.params;
    
    Job.remove({ id: id }, function(err) {
      if (!err) {
        return res.send({success:true,message: "Error: Server Error",});
      }else {
        return res.send({success:true,message: "Success: Deleted",});
      }
   });
  });
  app.get('/library/user/reports',(req,res,next)=>{
    const { uid } = req.query;
    console.log(req.query.limit);
    if(req.query.limit !== undefined){
      const { limit } = req.query;
      Report.find({user: uid},{website:true, date:true, id:true,views:true}).populate({path:'metadata'}).sort('-date').limit(10).exec((err,reports)=>{
        if(err){
          return res.send({success:false,message:"Error: Server error",data:[]});
        }else if( reports.length > 0){
          return res.send({success:true,message: "Success: Data found", data:reports});
        }
      });

    }else{
      Report.find({user: uid},{website:true, date:true, id:true,views:true}).populate({path:'metadata'}).sort('-date').exec((err,reports)=>{
        if(err){
          return res.send({success:false,message:"Error: Server error",data:[]});
        }else if( reports.length > 0){
          return res.send({success:true,message: "Success: Data found", data:reports});
        }
      });
    }
    //,{website:true}).populate({path:'metadata'}
   
  });
  app.get('/library/user/received/reports',(req,res,next)=>{
    const { uid } = req.query;
    console.log(uid);
      User.find({_id: uid},{receivedreports:true}).exec((err,reports)=>{
        console.log(reports);
        if(err){
          return res.send({success:false,message:"Error: Server error",data:[]});
        }else{
          return res.send({success:true,message: "Success: Data found", data:reports});
        }
      });
    
   
  });

  app.put('/library/Report',(req,res,next)=>{
    const {body } = req;
    const {uid,} = body;
    brokenLinkTester.discoverWebResources(null,req,uid);
    res.send({response:true,error:''});
  });

  app.post('/library/generateWebShot',(req,res,next)=>{
    const {body } = req;
    const {web,uid} = body;
    webshot.createWebShoot(web,req,uid);
  });

  app.put('/library/brokenLink',(req,res,next)=>{
    const {body } = req;
    const {uid,web} = body;
  //  brokenLinkTester.displayBrokenLink(null,req,uid);
    console.log(body);
    brokenLinkTester.displayBrokenLink_back_tool(web,req,uid);

    res.send({response:true,error:''});
  });

  app.post("/library/GenerateSitemap",(req,res,next)=>{
      const { body } = req;
      const { web, uid  } = body;
      console.log(web);
      brokenLinkTester.generateSiteMap_back(web,req,uid);
      res.send({response:true,error:''});
  });

  app.get('/library/Sitemap',(req,res,next)=>{
    const { query } = req;
    let { uid} = query;
    try {
      var stats = fs.statSync('./sitemaps/' + uid+'-sitemap.xml');
    }catch (e) {
    }

    if(stats && stats.isFile()){
      return res.send({success: true,exist:true,});
    }else{return res.send({success: true,exist: false})};

  });

  app.get('/library/sitemap/:id',(req,res,next)=>{
    res.download('./sitemaps/' +req.params.id + '-sitemap.xml');
  })

  app.put('/test',(req,res,next)=>{
    const {body } = req;
      const {uid} = body;
    brokenLinkTester.displayBrokenLink_back(null,req,null);
    res.send({response:true,error:''});
  });


}
