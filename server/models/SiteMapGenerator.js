var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const fs = require('fs');
var bcrypt = require('bcrypt-nodejs');
const axios = require('axios');
const cheerio = require('cheerio');
const isRelativeUrl = require('is-relative-url');
var Crawler = require('simplecrawler');
const request = require('request');
let plimit = require('p-limit');
var port = 80;
var exclude = ['gif', 'jpg', 'jpeg', 'png', 'ico', 'bmp', 'ogg', 'webp',
  'mp4', 'webm', 'mp3', 'ttf', 'woff', 'json', 'rss', 'atom', 'gz', 'zip',
  'rar', '7z', 'css', 'js', 'gzip', 'exe', 'pdf', 'svg','xml'];
var exts = exclude.join('|');
var fetch = require("node-fetch");
var regex = new RegExp('\.(' + exts + ')', 'i'); // This is used for filtering crawl items.
var xml2js = require('xml2js');
let current_user_task = [];
const { PerformanceObserver, performance } = require('perf_hooks');



module.exports = {

   async discoverWebResources(links,req,uid){

     crawler = new Crawler('http://instantes.net');
     crawler.initialPort = port;
     crawler.maxDepth = 1;
     crawler.interval=10;
     crawler.start();

     let size = 0;
     let resources = [];

     crawler.discoverResources = function(buffer, queueItem) {
       let a = performance.now();
       var $ = cheerio.load(buffer.toString("utf8"));
        let b = performance.now();
        console.log('a: ' + a + " " + "b: " + b);
       $("script[src]").map(function () {
         let url;
         if(isRelativeUrl($(this).attr('src'))){
           url = queueItem.url + $(this).attr('src');
         }else{
           url = $(this).attr('src');
         }
         var isAlready = resources.filter(resources => (resources.link === url));
         if(!isAlready.length > 0 ){
           resources.push({link: url});
         }

         return $(this).attr("src");
       }).get();

       $("link[href]").map(function () {
         let url;
         if(isRelativeUrl($(this).attr('href'))){
           url = queueItem.url + $(this).attr('href');
         }else{
           url = $(this).attr('href');
         }
         var isAlready = resources.filter(resources => (resources.link === url));
         if(!isAlready.length > 0 ){
           resources.push({link: url});
         }
         return $(this).attr("href");
       }).get();

       $("img[src]").map(function () {
         let url;
         if(isRelativeUrl($(this).attr('src'))){
           url = queueItem.url + $(this).attr('src');
         }else{
           url = $(this).attr('src');
         }
         var isAlready = resources.filter(resources => (resources.link === url));
         if(!isAlready.length > 0 ){
           resources.push({link: url});
         }
         return $(this).attr("src");
       }).get();



     };

     crawler.on('complete', function(){
       var io = req.app.get('socketio');
       let totalTime = 0;
       for (let i = 0; i < resources.length; i++) {
         try {
           request({url:resources[i].link,time:true}, function (error, response, body) {
             if(response.headers['content-type'].includes('javascript')){
               resources[i] = {link: resources[i].link, size: response.headers['content-length'], type: 'javascript'};
               totalTime+= response.timings.end;
             }else if (response.headers['content-type'].includes('css')){
               resources[i] = {link: resources[i].link, size: response.headers['content-length'], type: 'css'};
               totalTime+= response.timings.end;
             }else if(response.headers['content-type'].includes('image')){
               resources[i] = {link: resources[i].link, size: response.headers['content-length'], type: 'image'};
               totalTime+= response.timings.end;
             }

             console.log('total time: ' + totalTime);
           //  console.log(`${resources[i].link}, elapsedTime: ${response.timings.end}`);
             io.emit('performance-resources-'+uid,resources[i]);
           });

         } catch (err) {
           console.log(err);
         }
       }

     });

  },

  uidStartJob(uid){
    var user = current_user_task.indexOf(uid);
    console.log(user);
    if(user !== null && user < 0){
      current_user_task.push(uid);
      return 1;
    }else{
      return 0;
    }

  },
  uidFinishJob(uid){

    var user = current_user_task.indexOf(uid);
    if( user > -1){
      current_user_task.splice(user,1);
    }
  },
  /*
  async displayBrokenLink(links,req,uid){
    var io = req.app.get('socketio');
    if(!this.uidStartJob(uid)) { io.emit('brokenLinks-'+uid,{links:[],percentage:'0',status:'unfinished'}); return 0;}

    let crawler;
    var parser = new xml2js.Parser();

    let data = fs.readFileSync('./sitemaps/'+uid+'-sitemap.xml');
    parser.parseString(data,function (err,result) {
      console.log(result.urlset.url[0].loc);
      for (var i = 0; i < result.urlset.url.length; i++){
        if(i == 0){ crawler = new Crawler(result.urlset.url[i].loc[0]);
        }else{
          crawler.queueURL(result.urlset.url[i].loc[0]);
        }
      }
      console.log('xml cargado');
    });
    crawler.initialPort = port;
    crawler.maxDepth = 1;
    crawler.interval=10;
    let brokenLinks = [];
    crawler.start();
    let count = 0;
    crawler.discoverResources = function(buffer,queueItem){
      /*console.log("\n link from : " +queueItem.url + "   adding: "); */
/*      var domain = queueItem.url.match(/^http:\/\/[^/]+/);
      brokenLinks.push({location:queueItem.url, bklinks:[]});
      var $ = cheerio.load(buffer.toString('utf-8'));
      return $("a[href]").map( function(){
         var url = $(this).attr("href").match(/^http:\/\/[^/]+/);
          if( url && url[0].localeCompare(domain) ){
            brokenLinks[brokenLinks.length-1].bklinks.push(url.input);// console.log(url.input +",");
            count++;
          };
        return $(this).attr("href")
      }).get();

    };

    crawler.on('complete',async function() {

      console.log(brokenLinks);
      let deadLinks = [];
      let checked = [];
      let current = 0;
      for(var i = 0; i < brokenLinks.length; i++){
        for(var j = 0; j < brokenLinks[i].bklinks.length; j++){
          let result = null;
            var isAlready = checked.filter(checked => (checked === brokenLinks[i].bklinks[j]));
            if(isAlready.length > 0 ){}else{
              //  console.log(brokenLinks[i].bklinks[j] + ": ");
                checked.push(brokenLinks[i].bklinks[j]);
                let result = await axios.get(brokenLinks[i].bklinks[j]).then((response) => {
                  return response.status;
                }).catch((error) => {
                  deadLinks.push({deadlink: brokenLinks[i].bklinks[j], where: brokenLinks[i].location,status:404 });
                  return '404';
                });
            }
          current++;
          let perce = Math.floor(((current/count)*100));
          io.emit('brokenLinks-'+uid,{links:deadLinks,percentage: perce,status:'unfinished'});
        }

      }
      io.emit('brokenLinks-'+uid,{links:deadLinks,percentage:'100',status:'finished'});
      module.exports.uidFinishJob(uid);
      console.log(deadLinks);
    });
    
  },
*/
  async generateSiteMap(url,req,uid){
    let pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
      url = "http://" + url;
    }
    var io = req.app.get('socketio');
    var crawler = new Crawler(url);
    var builder = require('xmlbuilder');
    var pages = []; // This array will hold all the URLs
    // Crawler configuration
    crawler.initialPort = port;
    crawler.initalPath = '/';
    crawler.interval=10;
    crawler.addFetchCondition(function (parsedURL) {
      return !parsedURL.path.match(regex); // This will reject anything that's not a link.
    });
    // Run the crawler
    crawler.start();
    let count = 0;
    let root = builder.create('urlset').att('xmlns','http://www.sitemaps.org/schemas/sitemap/0.9');
    let d = new Date();
    var date = d.toJSON();
    crawler.on('fetchcomplete', async function(item, responseBuffer, response) {
      root.ele({url:{loc:item.url, lastmod: date ,priority: 0.5}});
      pages.push(item.url); // Add URL to the array of pages
      console.log(count + " : " +item.url);
      count++;
      if(count > 100){
        this.stop();
        fs.writeFile('./sitemaps/' +uid +'-sitemap.xml',root.end({pretty: true}),(err)=>{ if(err) throw err;});
        io.emit("news",{url: "./sitemaps/" + uid + "-sitemap.xml", total: count});
      }
      io.emit('percentage-'+uid,Math.floor((count/100*100)));
    });
    crawler.on('complete', async function() {
      io.emit("news",{url: "./sitemaps/" + uid + "-sitemap.xml", total: count});
      fs.writeFile('./sitemaps/' +uid +'-sitemap.xml',root.end({pretty: true}),(err)=>{ if(err) throw err;});
      console.log("done");

    })


  },

  async findSiteMap_back(url,pages){
      console.log("entro");
      return new Promise(function(resolve,reject){
        let crawler_2 = new Crawler(url);
        pages.forEach(element => {
          crawler_2.queueURL(element);  
        });
        crawler_2.initialPort = port;
        crawler_2.maxDepth = 1;
        crawler_2.interval=10;
        crawler_2.start();
        let found = [];
        let count = 0;
        crawler_2.discoverResources = function(buffer,queueItem){
          /*console.log("\n link from : " +queueItem.url + "   adding: "); */
          var $ = cheerio.load(buffer.toString('utf-8'));
          return $("a[href]").map( function(){
            var url = $(this).attr("href");
            console.log(url);
                  if(url.includes("sitemap.xml")){
                    found.push(url);
                  }
                count++; 
            return $(this).attr("href")
          }).get();
      };
       crawler_2.on('complete',async function() {console.log("termino"); console.log(found);resolve(found);});
        
        });
      },


  async generateSiteMap_back(url,req,uid){
    let pattern = /^((http|https|ftp):\/\/)/;
    
    let promises = [];
    let found = false;
    var pages = []; 
    let robots = [];
    if(!pattern.test(url)) {
      url = "http://" + url;
    }       
    var dominio=String(url).replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
    console.log("domain" + dominio);
    fetch("http://"+dominio+"/robots.txt").then(function(response) {
      return response.text().then(function(text) {
           robots = text.split("\n");
          for (var i=robots.length-1; i>=0; i--) {
            if (robots[i].includes("#")) {
              robots.splice(i, 1);            }
        }
        console.log(robots);

      });
    }).catch((er)=>{
      console.log(er);
    });
    

    function api_call(){
      return new Promise(function(resolve,reject){
       
        console.log(url);
        var io = req.app.get('socketio');
        var crawler = new Crawler(url);
        var builder = require('xmlbuilder');
        // Crawler configuration
        crawler.initialPort = port;
        crawler.initalPath = '/';
        crawler.maxConcurrency = 3;

        
        crawler.interval=10;
        crawler.addFetchCondition(function (parsedURL) {
          return !parsedURL.path.match(regex); 
        });
        // Run the crawler
        crawler.start();
        let count = 0;
        let root = builder.create('urlset').att('xmlns','http://www.sitemaps.org/schemas/sitemap/0.9');
        let d = new Date();
        var date = d.toJSON();
        crawler.on('fetchcomplete', async function(item, responseBuffer, response) {
          if(!found){ 
            if(item.url.includes("sitemap.xml")){
                found =  item.url;
              }
           }
          root.ele({url:{loc:item.url, lastmod: date ,priority: 0.5}});
          pages.push(item.url); // Add URL to the array of pages
          console.log(count + " : " +item.url);
          count++;
          if(count > 50){
            this.stop();
            io.emit('percentage-'+uid,Math.floor(100));

            fs.writeFile('./sitemaps/' +uid +'-sitemap.xml',root.end({pretty: true}),(err)=>{ if(err){ throw err;}else{ resolve({url: "./sitemaps/" + uid + "-sitemap.xml", total: count,found:found,robots:robots})} } )
            io.emit("test",{url: "./sitemaps/" + uid + "-sitemap.xml", total: count,found:found});
          }else{
            io.emit('percentage-'+uid,Math.floor((count/100*100)));

          }
        });
        crawler.on('complete', async function() {
          console.log("aqui");
          io.emit('percentage-'+uid,Math.floor(100));

          io.emit("test",{url: "./sitemaps/" + uid + "-sitemap.xml", total: count, found:found});
          fs.writeFile('./sitemaps/' +uid +'-sitemap.xml',root.end({pretty: true}),(err)=>{ if(err){ throw err;}else{ resolve({url: "./sitemaps/" + uid + "-sitemap.xml", total: count,found:found,robots:robots})} } )
          console.log("done");

        })
      });
    }

   promises.push(api_call());
   let promisess = [];
   return Promise.all(promises).then((result)=>{
     return result;
   /*
     console.log("lo llamo");
     promisess.push(this.findSiteMap_back(url,pages));
     return Promise.all(promisess).then((res)=>{
       result.found = [res];
       console.log('sitemap created');
         return result;
     })
   */
    });


  },
  async displayBrokenLink_back(links,req,url){
 //   url="./sitemaps/test2.xml";
    var io = req.app.get('socketio');
    let promises = [];
    let total = 0;
    let domain = '';
    let deadLinks = [];
    let promise = [];
    let externalBrokenLinks=[];
    let brokenLinks = [];  
    let externals = [];
    function api_call(){
      return new Promise(function(resolve,reject){
        let crawler;
        var parser = new xml2js.Parser();
        console.log(url);
        let data = fs.readFileSync(url);
        parser.parseString(data,function (err,result) {
          domain = result.urlset.url[0].loc;
          console.log(result.urlset.url[0].loc);
          for (var i = 0; i < result.urlset.url.length; i++){
            if(i == 0){ crawler = new Crawler(result.urlset.url[i].loc[0]);
            }else{
              crawler.queueURL(result.urlset.url[i].loc[0]);
            }
          }
          console.log('xml cargado');
        });
        crawler.initialPort = port;
        crawler.maxDepth = 1;
        crawler.interval=10;
        crawler.maxConcurrency = 3;
        var dominio =String(domain).replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
           
        crawler.start();
        let count = 0;
        crawler.discoverResources = function(buffer,queueItem){
          /*console.log("\n link from : " +queueItem.url + "   adding: "); */
          let pattern = /^((http|https|ftp):\/\/)/;
          var domain = queueItem.url.match(pattern);
          brokenLinks.push({location:queueItem.url, bklinks:[]});
          var $ = cheerio.load(buffer.toString('utf-8'));
          return $("a[href]").map( function(){
            var url = $(this).attr("href").match(pattern);
              if( url && url[0].localeCompare(domain) ){
                if(url.input.includes(dominio)){
                }else{
                  var isAlready = externalBrokenLinks.filter(externalBrokenLinks => (externalBrokenLinks === url.input));
                  if(isAlready.length > 0 ){}else{
                     externalBrokenLinks.push(url.input);
                  }
                }
                 count++;
                 brokenLinks[brokenLinks.length-1].bklinks.push(url.input);// console.log(url.input +",");

              }
            return $(this).attr("href")
          }).get();
        };
    

        function axios_call(url){
          return new Promise(function(resolve,reject){

              axios.get(url).then((item)=>{
              resolve(null);
              }).catch((err)=>{
                try{
                  resolve({url:url,status:err.response.status});
                }catch(err){
                  resolve({url:url,status:404});
                }
              
             
              })
          });
        }

        crawler.on('complete',async function() {
          console.log("aa");

          externalBrokenLinks.forEach(element => {
              promise.push(axios_call(element));
          });


     
         
       //   console.log(brokenLinks);
          console.log(externalBrokenLinks);
        
      
          let checked = [];
          let current = 0;


         
            
        

          function call(item){
            return new Promise(function(resolve,reject){
              let result;
            if(item.includes(dominio)){
              var isAlready = checked.filter(checked => (checked === item));
              if(isAlready.length > 0 ){}else{
                console.log(item + ": ");
                  checked.push(item);
                  axios.get(item).then((response) => {
                    return response.status;
                  }).catch((error) => {
                    try{
                     result = {deadlink: item, where:item.location,status:error.response.status };
                    }catch(err){
                     result = {deadlink: item, where:item.location,status:404};
                    }
                  });
              
              }
            } 

              resolve(result);
            });
          }
          /*
          let counter = 0;
          let st_counter = -1;
          console.log(brokenLinks.length);
          while(counter < brokenLinks.length){
            if(counter !== st_counter){ 
                let iterationCalls = [];
                st_counter++;
                brokenLinks[counter].bklinks.forEach((item)=>{
                  total++;
               //   iterationCalls.push(call(item));
                  setTimeout(  iterationCalls.push(call(item)), 10000 );
                })
            
              Promise.all(iterationCalls).then((result)=>{
                console.log(result);
                counter++;  
                current++;
              });
            }    
          }
         
          */
         
        
          
            for(var i = 0; i < brokenLinks.length; i++){
              for(var j = 0; j < brokenLinks[i].bklinks.length; j++){
                  total++;
                  if(brokenLinks[i].bklinks[j].includes(dominio)){
                    var isAlready = checked.filter(checked => (checked === brokenLinks[i].bklinks[j]));
                    if(isAlready.length > 0 ){}else{
                      console.log(brokenLinks[i].bklinks[j] + ": ");
                        checked.push(brokenLinks[i].bklinks[j]);
                        await axios.get(brokenLinks[i].bklinks[j]).then((response) => {
                          return response.status;
                        }).catch((error) => {
                          try{
                            deadLinks.push({deadlink: brokenLinks[i].bklinks[j], where: brokenLinks[i].location,status:error.response.status });
                          }catch(err){
                            deadLinks.push({deadlink: brokenLinks[i].bklinks[j], where: brokenLinks[i].location,status:404});
                          }
                        });
                    
                    }
                }
                current++;
               
              }
              console.log(deadLinks);
            }
            
 
    //        io.emit('brokenLinks-'+url,{links:deadLinks,percentage:'100',status:'finished'});
            console.log(deadLinks);
            resolve(deadLinks);
          });
        
        }

        )}
    promises.push(api_call());
    return Promise.all(promises).then((result)=>{
      return Promise.all(promise).then((result)=>{
        var filtered = result.filter(function (el) {
          return el != null;
        });
        console.log(filtered);
        filtered.forEach((item)=>{  
        for(var i = 0; i < brokenLinks.length; i++){
            if(brokenLinks[i].bklinks.includes(item.url)){
              deadLinks.push({deadlink: item.url, where: brokenLinks[i].location,status:item.status});
          }
        }
        })
      }).then(()=>{
        console.log('broken links created');
        //  console.log(result);
          return {result:result,total:total};
      });


     
     });

  },
  async displayBrokenLink_back_tool(url,req,uid){
    //   url="./sitemaps/test2.xml";
       var io = req.app.get('socketio');
       let promises = [];
       let total = 0;
       let domain = '';

       let id = bcrypt.hashSync(Date.now(),bcrypt.genSaltSync(5,null));
       id = id.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

      this.generateSiteMap_back(url,req,id).then( async () => {
        function api_call(){
          return new Promise(function(resolve,reject){
            let crawler;
            var parser = new xml2js.Parser();
            console.log(url);
            let data = fs.readFileSync('./sitemaps/'+id+"-sitemap.xml");
            parser.parseString(data,function (err,result) {
              domain = result.urlset.url[0].loc;
              console.log(result.urlset.url[0].loc);
              for (var i = 0; i < result.urlset.url.length; i++){
                if(i == 0){ crawler = new Crawler(result.urlset.url[i].loc[0]);
                }else{
                  crawler.queueURL(result.urlset.url[i].loc[0]);
                }
              }
              console.log('xml cargado');
            });
            crawler.initialPort = port;
            crawler.maxDepth = 1;
            crawler.interval=10;
            crawler.maxConcurrency = 3;
            var dominio =String(domain).replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
            let externalBrokenLinks=[];
            let brokenLinks = [];        
            crawler.start();
            let count = 0;
            crawler.discoverResources = function(buffer,queueItem){
              /*console.log("\n link from : " +queueItem.url + "   adding: "); */
              let pattern = /^((http|https|ftp):\/\/)/;
              var domain = queueItem.url.match(pattern);
              brokenLinks.push({location:queueItem.url, bklinks:[]});
              var $ = cheerio.load(buffer.toString('utf-8'));
              return $("a[href]").map( function(){
                var url = $(this).attr("href").match(pattern);
                  if( url && url[0].localeCompare(domain) ){
                    if(url.input.includes(dominio)){
                    }else{
                      var isAlready = externalBrokenLinks.filter(externalBrokenLinks => (externalBrokenLinks === url.input));
                      if(isAlready.length > 0 ){}else{
                          externalBrokenLinks.push(url.input);
                      }
                    }
                      count++;
                      brokenLinks[brokenLinks.length-1].bklinks.push(url.input);// console.log(url.input +",");
    
                  }
                return $(this).attr("href")
              }).get();
            };
        
    
            function axios_call(url){
              return new Promise(function(resolve,reject){
    
                  axios.get(url).then((item)=>{
                  resolve(null);
                  }).catch((err)=>{
                    try{
                      resolve({url:url,status:err.response.status});
                    }catch(err){
                      resolve({url:url,status:404});
                    }
                  
                  
                  })
              });
            }
            let deadLinks = [];
            let status = "unfinished";
            let perce = 0;
            let externals = [];
            crawler.on('complete',async function() {
              console.log("aa");
    
              let promise = [];
              externalBrokenLinks.forEach(element => {
                  promise.push(axios_call(element));
              });
    
                Promise.all(promise).then((result)=>{
                  console.log("external done");
                var filtered = result.filter(function (el) {
                  return el != null;
                });
                console.log(filtered);
                filtered.forEach((item)=>{  
                for(var i = 0; i < brokenLinks.length; i++){
                    if(brokenLinks[i].bklinks.includes(item.url)){
                      deadLinks.push({deadlink: item.url, where: brokenLinks[i].location,status:item.status});
                      io.emit('brokenLinks-'+uid,{links:deadLinks,percentage: perce,status:status,web:url});

                  }
                }
                })
              });
          
              
            //   console.log(brokenLinks);
            //   console.log(externalBrokenLinks);
            
          
              let checked = [];
              let current = 0;
    
    
              
                
            
    
              function call(item){
                return new Promise(function(resolve,reject){
                  let result;
                if(item.includes(dominio)){
                  var isAlready = checked.filter(checked => (checked === item));
                  if(isAlready.length > 0 ){}else{
                    console.log(item + ": ");
                      checked.push(item);
                      axios.get(item).then((response) => {
                        return response.status;
                      }).catch((error) => {
                        try{
                          result = {deadlink: item, where:item.location,status:error.response.status };
                        }catch(err){
                          result = {deadlink: item, where:item.location,status:404};
                        }
                      });
                  
                  }
                } 
    
                  resolve(result);
                });
              }
            
                for(var i = 0; i < brokenLinks.length; i++){
                  for(var j = 0; j < brokenLinks[i].bklinks.length; j++){
                      total++;
                      if(brokenLinks[i].bklinks[j].includes(dominio)){
                        var isAlready = checked.filter(checked => (checked === brokenLinks[i].bklinks[j]));
                        if(isAlready.length > 0 ){}else{
                          console.log(brokenLinks[i].bklinks[j] + ": ");
                            checked.push(brokenLinks[i].bklinks[j]);
                            await axios.get(brokenLinks[i].bklinks[j]).then((response) => {
                              return response.status;
                            }).catch((error) => {
                              try{
                                deadLinks.push({deadlink: brokenLinks[i].bklinks[j], where: brokenLinks[i].location,status:error.response.status });
                              }catch(err){
                                deadLinks.push({deadlink: brokenLinks[i].bklinks[j], where: brokenLinks[i].location,status:404});
                                io.emit('brokenLinks-'+uid,{links:deadLinks,percentage: perce,status:status,web:url});
                              }
                            });
                        
                        }
                    }
                    current++;
                    let perce = Math.floor(((current/count)*100));
                    io.emit('brokenLinks-'+uid,{links:deadLinks,percentage: perce,status:status,web:url});
                  }
                  console.log(deadLinks);
                  status =  'finished';
                  perce=100;
                  io.emit('brokenLinks-'+uid,{links:deadLinks,percentage:perce,status:status,web:url});                   

                }
                
      
        //        io.emit('brokenLinks-'+url,{links:deadLinks,percentage:'100',status:'finished'});
                console.log(deadLinks);
                resolve(deadLinks);
              });
            
            }
    
            )}
        promises.push(api_call());
        return Promise.all(promises).then((result)=>{
            console.log('broken links created');
          //  console.log(result);
            return {result:result,total:total};
          });
     })
     },


  test: async function crawlPage(url,req) {
   // try{let links = await getAllLinks(url)}catch(err){console.log(err);};
    try{let links = await this.foo(url)}catch(err){console.log(err);};
    var io = req.app.get('socketio');
    let result = [];
    let count = 0;
    for (let link of links) {
      try {
        let resp = {};
        if (isRelativeUrl($(link).attr('href'))) {
          resp = await axios.get(url + $(link).attr('href'))
        } else {
          resp = await axios.get($(link).attr('href'))
        }
          var obj = {link: ($(link).attr('href')),status: resp.status};
          var isAlready = result.filter(result => (result.link === obj.link));
          if(isAlready.length > 0){
          }else{
        //    console.log(obj);
            result.push({link: ($(link).attr('href')) ,status: resp.status});
          }
         // io.emit('news', result[count] );
      } catch (err) {
        result.push({link: $(link).attr('href'),status: 'not Valid'});
    //    console.log("Not a valid URL: " + $(link).attr('href'));
       // io.emit('news', result[count] );
      }
      if(count % 5 == 0 ){
     //   io.emit('news', result );
      }
      count++;
    //  console.log(count);
    } // console.log(result);
      return {json:'aba'};
  }
}
