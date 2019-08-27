const request = require('request');
const fs = require('fs');
let UglifyJS = require("uglify-js");
let CleanCSS = require('clean-css');

module.exports = {
      //funcion para comprobar el posible ahorro.
      //data es una lista de archivos CSS y JS
      async checkIfMinify(data){
      let promises = [];
      //funcion para asincronia
      function api_call(item){
          return new Promise(function(resolve,reject){
            request({url:item.where,time:true}, function (error, response, body) {
              let options = {};
              let result = null;
              let stats = {};
              //comprobamos si es Script o CSS, lo minificamos y comprobamos su posible ahorro.
              console.log(item.deadlink.resourceType);
              if(item.deadlink.resourceType === "Script"){
                result = UglifyJS.minify(body);
                
             //   console.log(result);
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
    //funcion join
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
            console.log(body);console.log(type);
            console.log(url);
           // console.log(body)
            let result = (type === '1') ? UglifyJS.minify(body) : new CleanCSS(options).minify(body);
            (type === '1') ? resolve(result.code) : resolve(result.styles);
          });
        }catch (e){
          console.error(e);
        }

      });
  },

};
