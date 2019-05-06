const cheerio = require('cheerio');
const axios = require('axios');
module.exports = {
  async check_Tag(type,html){
    let count = 0;
    try {
        html(type).map( function(){
         count++;
         return html(this).attr(type)
       }).get();

    }catch(e){
    };
    console.log( type + " Tags" + count);
    return count;
  },

  async loadHtml(){
    let html;
    try {
      await axios.get('http://instantes.net').then((response)=> {
        html = cheerio.load(response.data);
      });
    }catch(e){
    };
    return html;
  },

  async get_allHTags(){
   const html = await this.loadHtml();
   const h1 = await this.check_Tag("h1",html);
   const h2 = await this.check_Tag("h2",html);
   const h3 = await this.check_Tag("h3",html);
   const h4 = await this.check_Tag("h4",html);
   return {h1: h1,h2:h2,h3:h3,h4:h4, status:'success',errors:''};
  },

  async get_description(){
    const html = await this.loadHtml();
    let count = 0;
    let desc;
    try {
      html("meta[name=description]").map( function(){
        count++;
        desc =  html(this).attr('content');
      }).get();

    }catch(e){
    };
    console.log( "Description " + count);
    return {description:desc, count:count, status:'success',errors:''};
  },

  async get_keywords(){
    const html = await this.loadHtml();
    let count = 0;
    let keywords;
    try {
      html("meta[name=keywords]").map( function(){
        count++;
        keywords =  html(this).attr('content');
      }).get();

    }catch(e){
    };
    console.log( "keywords " + count);
    return {keywords:keywords, count:count, status:'success',errors:''};
  },

  async get_wordFreqency(){
    const html = await this.loadHtml();
    let count = 0;
    let words = {};
    try {
      html("*").map( function(){
        html(this).text().split(" ").forEach(function (item){
          if( 0 !== item.length) {
            if(words[item] >0){
              words[item]++;
            }else{
              words[item] = 1;
            }
            console.log(words[item]);
            count++;
          }
        });
      }).get();

    }catch(e){
    };
    words.sort(function(a, b) {
      return a - b;
    });
    console.log( "keywords " + count);
    return {words:words, count:count, status:'success',errors:''};
  },

  async get_Title(){
    const html = await this.loadHtml();
    let count = 0;
    let title;
    try {
      html("title").map( function(){
        count++;
        title =  html(this).text();
      }).get();

    }catch(e){
    };
    console.log( "Title " + count);
    return {title:title, count:count, status:'success',errors:''};
  }



};
