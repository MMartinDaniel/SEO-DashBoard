
const minifier = require('./Minifier');
const bk_sitemap = require("./SiteMapGenerator");
const webshot = require("./webshot");
const seo_tasks = require("./SEO_tasks");
const Report = require("./Report");
const Ssl = require("./report_models/Ssl");
const Metadata = require('./report_models/Metadata');
var bcrypt = require('bcrypt-nodejs');
const User = require('../models/User');
const mongoose = require('mongoose');
const Job = require("../models/report_models/Jobs");


module.exports = {
    
    async generateReport(body,req){

        let id = bcrypt.hashSync(Date.now(),bcrypt.genSaltSync(5,null));
        id = id.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        let start_date = Date.now();
        const {options,web,uid} = body;
        console.log(web);     
        /*
        results[0] = (options[0]) ? seo_tasks.get_allHTags(web) : null ;
        results[1] = (options[1]) ? seo_tasks.get_certificate(web) : null;
        results[2] = (options[2]) ? seo_tasks.get_TitleMeta(web) : null;
        //results[4] = (options[4]) ? minifier.checkIfMinify(data) : null;
        //results[5] = (options[5]) ? seo_tasks.performance(web) : null;
        results[6] = (options[6]) ? bk_sitemap.generateSiteMap(web,req,uid) : null;
        //results[7] = (options[7]) ? seo_task.geResources(web) : null;
        results[8] = (options[8]) ? seo_tasks.get_imgAlt(web) : null;
        results[9] = (options[9]) ? webshot.createWebShoot(web,req,uid) : null;
        */
        
        let promises = [];
        var io = req.app.get('socketio');
        const newReport = new Report();
        const newJob = new Job();
        newJob.start_date = start_date;
        newJob.id = id;
        newJob.uid = uid;
        newJob.website = web;
        newJob.save();
        function api_call(item_index){
            return new Promise( function(resolve,reject){
                let result = null;
                switch(item_index){
                    case 0:
                        result = (options[item_index]) ? seo_tasks.get_allHTags(web) : null;
                        break;
                    case 1:
                        result = (options[item_index]) ?  seo_tasks.get_certificate(web) :null;
                        break;
                    case 2:
                        result =  seo_tasks.get_TitleMeta(web);
                        break;
                    case 3:
                        result = null ;
                        break;
                    case 4:
                        result = null ;
                        break;
                    case 5:
                      
                        break;
                    case 6: 
                        result = (options[item_index]) ? bk_sitemap.generateSiteMap(web,req,uid) :null;
                        break;
                    case 7: 
                        result = (options[item_index]) ? 1 :null;
                        break;    
                    case 8:
                        result = (options[item_index]) ? seo_tasks.get_imgAlt(web) :null;
                        break;
                    case 9:
                        result = (options[item_index]) ?  webshot.createWebShoot(web,req,uid) :null;
                        break;
                };

              //      newReport.performance = data_get['speed-index'];
                  //  newReport.resources = data_get['network-requests'];
                  io.emit(id,1);
                resolve(result);
            });
        };
  
        let i = -1;
        options.forEach(function(item){
            i++;
            if(i === 5){
                promises.push(seo_tasks.get_performance(web));
            }else{
                promises.push(api_call(i));
            }
          
        });
        
        Promise.all(promises).then((results)=>{
            
        newReport.performance =[
        results[5]['speed-index'],
        results[5]['first-cpu-idle'],
        results[5]['first-contentful-paint'],
        results[5]['first-meaningful-paint'],
        results[5]['interactive'],
        ];
        newReport.resources = results[5]['network-requests'];
        newReport.user = uid;
        newReport.email = "fake@email.com";
        newReport.id = id;
        newReport.date = start_date;
        newReport.website = web;
        if(results[0]){ newReport.htag = results[0]; };
        
        if(results[1]){ 
            const newCert = new Ssl();
            newCert.id = id;
            newCert.issuer = results[1].issuer.CN;
            newCert.SerialNumber = results[1].serialNumber;
            newCert.subjectaltname = results[1].subjectaltname;
            newCert.valid_from = results[1].valid_from;
            newCert.valid_to = results[1].valid_to;
            newReport.ssl = newCert;
            newCert.save();
         };
         
         if(results[2]){
            const newMeta = new Metadata();
            newMeta.id = id;
            newMeta.wordCloud = results[2].cloud.data;
            newMeta.favicon = results[2].favicon.data;
            newMeta.description = results[2].description.data;
            newMeta.keywords = results[2].keywords.data;
            newMeta.title = results[2].title.data;
            newReport.metadata = newMeta;
            newMeta.save();
         }
      
        newReport.save((err)=>{
          if(err){
            return({
              success:false,
              message: 'Error: Server error'
            });
          }
          return ({
            success:true,
            message: 'Error creating report'
          })
        })

          console.log('all solved');
         // console.log(results);
        });

        return id;


    }
}

