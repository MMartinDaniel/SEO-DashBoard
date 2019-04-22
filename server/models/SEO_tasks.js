const cheerio = require('cheerio');
module.exports = {

  gethtml(req){
    var $ = cheerio.load('http://instantes.net');
    console.log($.html());
    return $("a[href]").map( function(){
      console.log("result" + this);
      return $(this).attr("href")
    }).get();
  },
  async check_h1Tag(){

  },
  async check_h2Tag(){

  }
};
