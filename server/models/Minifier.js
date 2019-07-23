const request = require('request');
const fs = require('fs');
let UglifyJS = require("uglify-js");
let CleanCSS = require('clean-css');

module.exports = {

      checkIfMinify(data){
      let promises = [];

      function api_call(item){
          return new Promise(function(resolve,reject){
            request({url:item.where,time:true}, function (error, response, body) {
              let options = {};
              let result = null;
              let stats = {};
              if(item.deadlink.resourceType === "Script"){
                result = UglifyJS.minify(body);
                var res_size = encodeURI(result.code);
                if (res_size.indexOf("&#37;") !== -1) {
                  var count = res_size.split("%").length - 1;
                  if (count === 0) count++;
                  var tmp = res_size.length - (count * 3)
                  count = count + tmp
                } else {
                  count = res_size.length
                }
                stats = {
                  ...item,
                  minifiedSize: count,
                  originalSize: item.deadlink.resourceSize,
                  efficiency: (count/item.deadlink.resourceSize)-1,
                };

              }else{
                result =  new CleanCSS(options).minify(body);
                stats = {
                  ...item,
                  minifiedSize: result.stats.minifiedSize,
                  originalSize: result.stats.originalSize,
                  efficiency: result.stats.efficiency
                };
              }
             resolve(stats);
            });
          });
      };


      data.forEach(function(item){
        promises.push(api_call(item));
      });
     return Promise.all(promises).then((result)=>{
        console.log('all solved');
      //  console.log(result);
        return result;
      });

    },


      minifyJSCSS(url,type,callback){

        console.log(url);

      return new Promise(function(resolve,reject){
        try {
          request({url:url,time:true}, function (error, response, body) {
            let options = {};
            let result = (type === 1) ? UglifyJS.minify(body) : new CleanCSS(options).minify(body);
            resolve(result);
          });
        }catch (e){
          console.error(e);
        }

      });
  },

};
