const brokenLinkTester = require('../../models/SiteMapGenerator');
const webshot = require('../../models/webshot');
const report = require('../../models/Report_task');
const fs = require('fs');
const path = require('path');
const Report = require('../../models/Report');
const Job = require ('../../models/report_models/Jobs');
const User = require("../../models/User");
var nodemailer = require('nodemailer');

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

  app.get('/library/user/Report/increaseCounter/:id',(req,res,next)=>{
    const { id } = req.params;
    console.log("Updating:"+id);

    Report.findOneAndUpdate(({ id: id }, { $inc: { views: 1 } })
   ).exec((err,report)=> {
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (report.length != 1) {
        return res.send({success:true, message:'Success, Report found',data:report});
      }
  
  })});

  app.get('/library/user/Report/:id',(req,res,next)=>{
    const { id } = req.params;
    console.log(id);
    var populateQuery = [{path:'metadata'},{path:'ssl'},{path: 'webshot'}];
    Report.findOne({ id: id }).populate(populateQuery).exec((err,report)=> {
      if (err) {
        return res.end({success:false, message:'Error: Server error',data: []});
      } else if (report.length != 1) {
        return res.send({success:true, message:'Success, Report found',data:report});
      };
  
  })});

  app.post('/library/user/email',(req,res,next)=>{
    const {body} = req;
    const {email,id,uid} = body;   
    console.log(body);
    User.findOne({ _id: uid }, function(err) {
      if (err) {
        return res.send({success:true,message: "Error: Server Error",});
      }else {
        var mailOptions = {
          from: 'staticautoreply@gmail.com',
          to: email,
          subject: 'Sent you a report',
          html: "Sent you a report, to check it please click on the following <a href='http://localhost:8080/Report/"+id+"'>Link</a>",
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.send({success:true,message: "Success: sent",});
      }
   });
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
  

 
  app.delete('/library/user/report/:id',(req,res,next)=>{
    const { id } = req.params;
    Report.remove({ id: id }, function(err) {
      if (!err) {
        return res.send({success:true,message: "Error: Server Error",});
      }else {
        return res.send({success:true,message: "Success: Deleted",});
      }
   });
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
    //,{website:true}).populate({path:'metadata'}
    Report.find({user: uid},{website:true, date:true, id:true,views:true}).populate({path:'metadata'}).exec((err,reports)=>{
      if(err){
        return res.send({success:false,message:"Error: Server error",data:[]});
      }else if( reports.length > 0){
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
      const {uid} = body;
    brokenLinkTester.displayBrokenLink(null,req,uid);
    res.send({response:true,error:''});
  });

  app.post("/library/GenerateSitemap",(req,res,next)=>{
      const { body } = req;
      const { web, uid  } = body;
      console.log(web);
      brokenLinkTester.generateSiteMap(web,req,uid);
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
};
