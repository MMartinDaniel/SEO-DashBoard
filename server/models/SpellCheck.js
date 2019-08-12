let path = require("path");
let fs = require("fs");
let corpus_eng = String(fs.readFileSync(path.join(__dirname, "../../spellcheck/eng/corpus.txt")));
let corpus_es = String(fs.readFileSync(path.join(__dirname, "../../spellcheck/esp/dic.txt")));
var dictionary = require('dictionary-es')
var nspell = require('nspell')
const cheerio = require('cheerio');
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var bcrypt = require('bcrypt-nodejs');


module.exports = {

 async checkSpelling(url,req,id,excluded_words){
  var io = req.app.get('socketio');
  console.log(id);
  let pattern = /^((http|https|ftp):\/\/)/;
  if(!pattern.test(url)) {
    url = "http://" + url;
  }

  let html;
  
  
  JSDOM.fromURL(url, { pretendToBeVisual: true, includeNodeLocations: true }).then(dom => {
    //console.log(dom.serialize());
    const document = dom.window.document;
    const bodyEl = document.body; // implicitly created
    const pEl = document.querySelector("body");
    const textNode = pEl.firstChild;
    const imgEl = document.querySelector("img");
    const ps = document.querySelectorAll("style");
    Array.prototype.forEach.call( ps, function( node ) {
      node.parentNode.removeChild( node );
     });
     const ps2 = document.querySelectorAll("script");
     Array.prototype.forEach.call( ps2, function( node ) {
       node.parentNode.removeChild( node );
      });
  
    //this.test(pEl.textContent);
    let resul1 = pEl.innerHTML.replace('/(<[^>]+) style=".*?"/i', ' ');

    var regex = /(<([^>]+)>)/ig;
    var regex1 = /(<([^<>]+)>)/ig;

  //let result1 = pEl.innerHTML.replace(regex1, " ");
    let result1 = resul1.replace(regex1, " ");
  let result2 = result1.replace(regex, " ");



    //let inputWords = process.argv.slice(2);
  var res = result2.replace(/[\n  ]/g, " ");
  var trimmed = res.trim();
  var regex = /(<([^>]+)>)/ig;
  let res1 = trimmed.replace(regex, " ");
  res1.replace('&nbsp'," ");
  let words = res1.toLowerCase();
  var res = words.replace(/[!?;:|¿*_'`"0-9()-@=<>“”º…]/g, " ");
  var res = res.replace(/[\\/.,]/g, " ");
  let inputWords = res.split(" ");
  let correctInput = [];

  inputWords.forEach(element => {
   correctInput.push(element.replace(/(\r\n|\n|\r)/gm, " "));
  });
  
  let result = [];
  correctInput.map((word) => {
        if(word === "" || word === "\n" ){}else{  
          //console.log(spell.suggest('aplicacon')) // => ['color']
        if(!result.includes(word)) result.push(word);
        }
      
    })

    
dictionary((err,dict)=>{
  let perf = [];
  
  if (err) {
    throw err
  }
  let spell = nspell(dict);
  excluded_words.forEach((item)=>{
    spell.add(item);
  });
  
  function correct_call(item){
    return new Promise( function(resolve,reject){
        if(!spell.correct(item)){
            result_1 = ({base:item,correct:false});
        }else{
        result_1 = {base:item, correct:true};
        }
        resolve(result_1);
    });
    
};
result.forEach((item)=>{
    perf.push(correct_call(item));
});

return Promise.all(perf).then((res)=>{
  //console.log(item + ":" + spell.correct(item));
  io.emit(id,res);

  console.log("performance done");
  return res;
});



 
  





})



// console.log(result2);
  });
  
  /*
    console.log(url);
    */
  try {
 //   await axios.get("http://ugr.es").then((response)=> {
  //    html = cheerio.load(response.data);
   
    /*  this.test(html);
      let res = html.replace("  ", "");
     console.log(res);
     */
   // });
  }catch(e){
    console.log(e);
  };



 },
 
}