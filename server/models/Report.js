const minifier = require('./Minifier');
const bk_sitemap = require("./SiteMapGenerator");
const webshot = require("./webshot");
const seo_tasks = require("./SEO_tasks");

module.exports = {
    
    async generateReport(body,req){
        const {options,web,uid} = body;
        console.log(web);
        /*
        if(options[3]){
            await bk_sitemap.generateSiteMap(web,req,uid);
            bk_sitemap.displayBrokenLink(null,req,uid);
        }else{


        }
        */
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
        function api_call(item_index){
            return new Promise(function(resolve,reject){
                let result = null;
                switch(item_index){
                    case 0:
                        result = seo_tasks.get_allHTags(web);
                        break;
                    case 1:
                        console.log("calling get certificate");
                        result = seo_tasks.get_certificate(web);
                        break;
                    case 2:
                        result = null;
                        break;
                    case 3:
                        result = null ;
                        break;
                    case 4:
                        result = null ;
                        break;
                    case 5:
                        result = bk_sitemap.generateSiteMap(web,req,uid);
                        break;
                    case 6: 
                        result = null ;
                        break;
                    case 7:
                        result = seo_tasks.get_imgAlt(web);
                        break;
                    case 8:
                        result = webshot.createWebShoot(web,req,uid);
                        break;
                };
                resolve(result);
            });
        };
  
        let i = -1;
        options.forEach(function(item){
            i++;
            promises.push(api_call(i));
          
        });
       return Promise.all(promises).then((results)=>{
          console.log('all solved');
          console.log(results);
          return results;
        });


    }
}