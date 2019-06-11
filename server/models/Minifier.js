const request = require('request');
const fs = require('fs');

var resources = ['http://dnmartin.net/css/style.css'];
module.exports = {

       minifyCSS(url,callback){
      let css_string ="";
      console.log(url);

      return new Promise(function(resolve,reject){
        try {
          request({url:url,time:true}, function (error, response, body) {
            css_string = body;
            css_string = css_string.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,'');
            css_string = css_string.replace(/\s/g,'');
            resolve(css_string);
          });
        }catch (e){
          console.error(e);
        }

      });
      /*
       fs.writeFile('./csstest/css.css',css_string,(err)=>{
          if(err) console.error(err);
        });
        */
  },
  async minifyCSS_2(){
    resources.forEach(resource =>{
      request({url:resource,time:true}, function (error, response, body) {
        let css_string = body;
        css_string = css_string.replace(/\s/g,'');
        css_string = css_string.replace('\/\*[\wа-я\'\-\;\s\r\n\*]*\*\/)|(\/\/[\wа-я\s\'\-\;]*)|(\<![\-\-\sа-я\w\>\/]*\>','');
        fs.writeFile('./csstest/css.css',css_string,(err)=>{
          if(err) console.error(err);
        });
      });


    });
    return resources;
  }

};
