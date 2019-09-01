
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
const Webshot = require("../models/report_models/Webshot");
const axios = require('axios');

module.exports = {
    
    async generateReport(body,req){

        
        let id = bcrypt.hashSync(Date.now(),bcrypt.genSaltSync(5,null));
        id = id.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        let start_date = Date.now();
        const {options,web,uid} = body;
        let pattern = /^((http|https|ftp):\/\/)/;
        let url = web;
        if(!pattern.test(web)) {
            url = "http://" + web;
        }
        console.log(url);
        let val = await axios.get(url).then((response)=>{
            try {
                return response.status;
            } catch (error) {
                return error.response.status;
            }
        }).catch((err)=>{ 

            return 404;  
        })
        console.log(val);
        if(val !== 200 ){
            return false;
        }
     
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

//              }, 2000);
        let promises = [];
        var io = req.app.get('socketio');
        const newReport = new Report();
        const newJob = new Job();
        newJob.start_date = start_date;
        newJob.id = id;
        newJob.uid = uid;
        newJob.website = web;
        newJob.save();
        io.emit('update_job',"update_job");

        let result_1;
        let perf = [];
        let counterstatus = 0;
        let total_options = 0;
        options.forEach((item)=>{
            if(item) total_options++;
        })

  /*      io.on("test", data =>{
            console.log("received");
            console.log(data);
            });
            */

        function performance_call(){
            return new Promise( function(resolve,reject){
                result_1 = seo_tasks.get_performance(web);
                result_1.headers = seo_tasks.get_headers(web);
                resolve(result_1);
            });
            
        };
        function sitemap_call(){
            return new Promise( function(resolve,reject){
                result_1 = bk_sitemap.generateSiteMap_back(web,req,id);
        //        setInterval(function(){ 
                   
                resolve(result_1);
            });
            
        };

        perf.push(performance_call());
        (options[3] || options[6]) ? perf.push(sitemap_call()): null;

        Promise.all(perf).then((res)=>{
            console.log("performance done");
         //   console.log(res[1][0]);
            //console.log(res[0].minify);
         //   console.log(res[1][0].url);
     
        function api_call(item_index){
            return new Promise( function(resolve,reject){
               
                
                let result = null;
                switch(item_index){
                    case 0:
                        result = (options[item_index]) ? seo_tasks.get_allTags(web) : null;
                        break;
                    case 1:
                        result = (options[item_index]) ?  seo_tasks.get_certificate(web) :null;
                        break;
                    case 2:
                        result =  seo_tasks.get_TitleMeta(web);
                        break;
                    case 3:
                       result = (options[item_index]) ? bk_sitemap.displayBrokenLink_back(null,req,res[1][0].url) : null;
                        break;
                    case 4:
                        result =  (options[item_index]) ? minifier.checkIfMinify(res[0].minify) : null;
                        break;
                    case 5:
                        result =  (options[item_index]) ? seo_tasks.get_headers(web) : null;
                        
                        break;
                    case 6: 
                        result = (options[item_index]) ? 1 :null;
                    break;
                    case 7: 
                        result = (options[item_index]) ? 1 :null;
                        break;    
                    case 8:
                        result = (options[item_index]) ? seo_tasks.get_imgAlt(web) :null;
                        break;
                    case 9:
                        result = (options[item_index]) ?  webshot.createNeWebshot(web,id) :null;
                        break;
                }

              //      newReport.performance = data_get['speed-index'];
                  //  newReport.resources = data_get['network-requests'];
             
                console.log("["+ item_index +"]: Done");

                resolve(result);
                 
            });
        }
  
        let i = -1;
        options.forEach(function(item){
            i++;
            promises.push(api_call(i));
        });
        promises[0].then(array => { if(options[0] ){  io.emit(id,total_options);counterstatus++;}});
        promises[1].then(array => { if(options[1] ){  io.emit(id,total_options);counterstatus++;}});    
        promises[2].then(array => { if(options[2] ){  io.emit(id,total_options);counterstatus++;}});      
        promises[3].then(array => { if(options[3] ){  io.emit(id,total_options);counterstatus++;}});     
        promises[4].then(array => { if(options[4] ){  io.emit(id,total_options);counterstatus++;}});     
        promises[5].then(array => { if(options[5] ){  io.emit(id,total_options);counterstatus++;}});  
        promises[6].then(array => { if(options[6] ){  io.emit(id,total_options);counterstatus++;}});   
        promises[7].then(array => { if(options[7] ){  io.emit(id,total_options);counterstatus++;}});    
        promises[8].then(array => { if(options[8] ){  io.emit(id,total_options);counterstatus++;}});      
        promises[9].then(array => { if(options[9] ){  io.emit(id,total_options);counterstatus++;}});     

        Promise.all(promises).then((results)=>{
            console.log(results[8]);
            console.log(results[3]);
            console.log(results[5]);
        newReport.performance =[
            res[0]['speed-index'],
            res[0]['first-cpu-idle'],
            res[0]['first-contentful-paint'],
            res[0]['first-meaningful-paint'],
            res[0]['interactive'],
            res[0]['totalsize']
            ];
        newReport.resources = res[0]['network-requests'];
        newReport.user = uid;
        newReport.id = id;
        newReport.date = start_date;
        newReport.website = web;
        newReport.minify = results[4];
        newReport.imgAlt = results[8];
        newReport.options = options;
        newReport.headers = results[5];
        newReport.sitemap = res[1];
        newReport.brokenLinks = results[3];
        newReport.views = 0;
        if(results[0]){ newReport.htag = results[0]; };
        
        if(results[1]){ 
            const newCert = new Ssl();
            if(results[1] !== null){
            newCert.id = id;
            newCert.issuer = results[1].issuer.CN;
            newCert.SerialNumber = results[1].serialNumber;
            newCert.subjectaltname = results[1].subjectaltname;
            newCert.valid_from = results[1].valid_from;
            newCert.valid_to = results[1].valid_to;
            newCert.fingerprint = results[1].fingerprint;
            }
            newReport.ssl = newCert;
            newCert.save();

         }
         
         if(results[2]){
            const newMeta = new Metadata();
            newMeta.id = id;
            console.dir(results[2].meta,{depth:null})
            newMeta.wordCloud = results[2].cloud.data;
            newMeta.favicon = results[2].favicon.data;
            newMeta.description = results[2].description.data;
            newMeta.keywords = results[2].keywords.data;
            newMeta.title = results[2].title.data;
            newMeta.meta = results[2].meta;
            newReport.metadata = newMeta;
            newMeta.save();
         }
         if(results[9]){
             
             const newWebshot = new Webshot();
             newWebshot.id = id;
             newWebshot.tabletPic = results[9].tabletPic;
             newWebshot.phonePic = results[9].phonePic;
             newWebshot.desktopPic = results[9].desktopPic;
             newReport.webshot = newWebshot;
             newWebshot.save();
         }
      


         Job.deleteOne({ id: id }, function(err) {
            if (!err) {
                console.log("job deleted");
            }else {
                console.log(" Job not deleted");
            }
         });
        
        newReport.save((err)=>{
          if(err){
            return({
              success:false,
              message: 'Error: Server error'
            });
          }
          
          io.emit('update_job',"update_job");

          return ({
            success:true,
            message: 'Report Created'
          })
        })

        User.findOneAndUpdate( { _id: uid }, { $addToSet: { reports: id }} , function(err) {
        if (err) {
            return({success:true,message: "Error: Server Error",});
        }else {
            return({success:true,message: "Success: Added",});
        }
        } )
        User.findOneAndUpdate( { _id: uid }, {$inc:{repcounter:1}},{new: true}  , function(err) {
            if (err) {
                return({success:true,message: "Error: Server Error",});
            }else {
                return({success:true,message: "Success: Added",});
            }
            } )
          console.log('all solved');
         // console.log(results);
        });

        return id;

    });
    },
    async generateReport_alarm(body,req){

        
        let start_date = Date.now();
        const {options,web,uid,id} = body;
        let pattern = /^((http|https|ftp):\/\/)/;
        let url = web;
        if(!pattern.test(web)) {
            url = "http://" + web;
        }
        console.log(url);
        let val = await axios.get(url).then((response)=>{
            try {
                return response.status;
            } catch (error) {
                return error.response.status;
            }
        }).catch((err)=>{ 

            return 404;  
        })
        console.log(val);
        if(val !== 200 ){
            return false;
        }
     
        let promises = [];
        var io = req.app.get('socketio');
        const newReport = new Report();
        const newJob = new Job();
        newJob.start_date = start_date;
        newJob.id = id;
        newJob.uid = uid;
        newJob.website = web;
        newJob.save();
        io.emit('update_job',"update_job");

        let result_1;
        let perf = [];
        let counterstatus = 0;
        let total_options = 0;
        options.forEach((item)=>{
            if(item) total_options++;
        })

        function performance_call(){
            return new Promise( function(resolve,reject){
                result_1 = seo_tasks.get_performance(web);
                result_1.headers = seo_tasks.get_headers(web);
                resolve(result_1);
            });
            
        };
        function sitemap_call(){
            return new Promise( function(resolve,reject){
                result_1 = bk_sitemap.generateSiteMap_back(web,req,id);
        //        setInterval(function(){ 
                   
                resolve(result_1);
            });
            
        };

        perf.push(performance_call());
        (options[3] || options[6]) ? perf.push(sitemap_call()): null;

        Promise.all(perf).then((res)=>{
            console.log("performance done");
         //   console.log(res[1][0]);
            //console.log(res[0].minify);
         //   console.log(res[1][0].url);
     
        function api_call(item_index){
            return new Promise( function(resolve,reject){
               
                
                let result = null;
                switch(item_index){
                    case 0:
                        result = (options[item_index]) ? seo_tasks.get_allTags(web) : null;
                        break;
                    case 1:
                        result = (options[item_index]) ?  seo_tasks.get_certificate(web) :null;
                        break;
                    case 2:
                        result =  seo_tasks.get_TitleMeta(web);
                        break;
                    case 3:
                       result = (options[item_index]) ? bk_sitemap.displayBrokenLink_back(null,req,res[1][0].url) : null;
                        break;
                    case 4:
                        result =  (options[item_index]) ? minifier.checkIfMinify(res[0].minify) : null;
                        break;
                    case 5:
                        result =  (options[item_index]) ? seo_tasks.get_headers(web) : null;
                        
                        break;
                    case 6: 
                        result = (options[item_index]) ? 1 :null;
                    break;
                    case 7: 
                        result = (options[item_index]) ? 1 :null;
                        break;    
                    case 8:
                        result = (options[item_index]) ? seo_tasks.get_imgAlt(web) :null;
                        break;
                    case 9:
                        result = (options[item_index]) ?  webshot.createNeWebshot(web,id) :null;
                        break;
                }


                console.log("["+ item_index +"]: Done");

                resolve(result);
                 
            });
        }
  
        let i = -1;
        options.forEach(function(item){
            i++;
            promises.push(api_call(i));
        });
        promises[0].then(array => { if(options[0] ){  io.emit(id,total_options);counterstatus++;}});
        promises[1].then(array => { if(options[1] ){  io.emit(id,total_options);counterstatus++;}});    
        promises[2].then(array => { if(options[2] ){  io.emit(id,total_options);counterstatus++;}});      
        promises[3].then(array => { if(options[3] ){  io.emit(id,total_options);counterstatus++;}});     
        promises[4].then(array => { if(options[4] ){  io.emit(id,total_options);counterstatus++;}});     
        promises[5].then(array => { if(options[5] ){  io.emit(id,total_options);counterstatus++;}});  
        promises[6].then(array => { if(options[6] ){  io.emit(id,total_options);counterstatus++;}});   
        promises[7].then(array => { if(options[7] ){  io.emit(id,total_options);counterstatus++;}});    
        promises[8].then(array => { if(options[8] ){  io.emit(id,total_options);counterstatus++;}});      
        promises[9].then(array => { if(options[9] ){  io.emit(id,total_options);counterstatus++;}});     

        Promise.all(promises).then((results)=>{
            console.log(results[8]);
            console.log(results[3]);
            console.log(results[5]);
        newReport.performance =[
            res[0]['speed-index'],
            res[0]['first-cpu-idle'],
            res[0]['first-contentful-paint'],
            res[0]['first-meaningful-paint'],
            res[0]['interactive'],
            res[0]['totalsize']
            ];
        newReport.resources = res[0]['network-requests'];
        newReport.user = uid;
        newReport.id = id;
        newReport.date = start_date;
        newReport.website = web;
        newReport.minify = results[4];
        newReport.imgAlt = results[8];
        newReport.options = options;
        newReport.headers = results[5];
        newReport.sitemap = res[1];
        newReport.brokenLinks = results[3];
        newReport.views = 0;
        if(results[0]){ newReport.htag = results[0]; };
        
        if(results[1]){ 
            const newCert = new Ssl();
            if(results[1] !== null){
            newCert.id = id;
            newCert.issuer = results[1].issuer.CN;
            newCert.SerialNumber = results[1].serialNumber;
            newCert.subjectaltname = results[1].subjectaltname;
            newCert.valid_from = results[1].valid_from;
            newCert.valid_to = results[1].valid_to;
            newCert.fingerprint = results[1].fingerprint;
            }
            Ssl.deleteOne({ id: id }, function(err) {
                newReport.ssl = newCert;
                newCert.save();    
            });
       
         }
         
         if(results[2]){
            const newMeta = new Metadata();
            newMeta.id = id;
            console.dir(results[2].meta,{depth:null})
            newMeta.wordCloud = results[2].cloud.data;
            newMeta.favicon = results[2].favicon.data;
            newMeta.description = results[2].description.data;
            newMeta.keywords = results[2].keywords.data;
            newMeta.title = results[2].title.data;
            newMeta.meta = results[2].meta;
            Metadata.deleteOne({ id: id }, function(err) {
                newReport.metadata = newMeta;
                newMeta.save();
            });
       
         }
         if(results[9]){
             
             const newWebshot = new Webshot();
             newWebshot.id = id;
             newWebshot.tabletPic = results[9].tabletPic;
             newWebshot.phonePic = results[9].phonePic;
             newWebshot.desktopPic = results[9].desktopPic;
             Webshot.deleteOne({ id: id }, function(err) {
                newReport.webshot = newWebshot;
                newWebshot.save();
            });
           
         }
      


         Job.deleteOne({ id: id }, function(err) {
            if (!err) {
                console.log("job deleted");
            }else {
                console.log(" Job not deleted");
            }
         });
         Report.deleteOne({ id: id }, function(err) {
            newReport.save((err)=>{
                if(err){
                  return({
                    success:false,
                    message: 'Error: Server error'
                  });
                }
                
                io.emit('update_job',"update_job");
      
                return ({
                  success:true,
                  message: 'Report Created'
                })
              })
        });
       

        User.findOneAndUpdate( { _id: uid }, {$inc:{repcounter:1}},{new: true}  , function(err) {
            if (err) {
                return({success:true,message: "Error: Server Error",});
            }else {
                return({success:true,message: "Success: Added",});
            }
            } )
          console.log('all solved');
         // console.log(results);
        });

        return id;

    });
    }

}

