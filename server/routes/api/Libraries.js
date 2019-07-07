const brokenLinkTester = require('../../models/SiteMapGenerator');
const webshot = require('../../models/webshot');
const report = require('../../models/Report');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {

  app.post('/library/fullReport',(req,res,next)=>{
      const {body} = req;
      const{uid} = body;
      report.generateReport(body,req);
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
