const cheerio = require('cheerio');
const axios = require('axios');
const stopword = require('stopword');
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
   // console.log( type + " Tags" + count);
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

  async get_description(html){

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
    return {data:desc, count:count, status:'success',errors:''};
  },

  async get_keywords(html){

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
    if(count == 0){
      keywords = "Keywords meta tag not found on website or is empty";
    }
    return {data:keywords, count:count, status:'success',errors:''};
  },

  async get_wordFreqency(html){

    let count = 0;
    let words = {};
    try {
      html("*").map( function(){
        var text = html(this).text().split(" ");
        const parsed_text = stopword.removeStopwords(text,stopword.es);
        parsed_text.forEach(function (item){
          if( 0 !== item.length) {
            if(words[item] >0){
              words[item]++;
            }else{
              words[item] = 1;
            }
          //  console.log(item);
            count++;
          }
        });
      }).get();

    }catch(e){
    };


    const keys = Object.keys(words);
    let max = -1;
    let selected_words = [];
    let key_max;
    let pos  = -1;
    let counter = 0;
    for (let i = 0; i < keys.length;i++){
      if(words[keys[i]] > max ){
        key_max = keys[i];
        max = words[keys[i]];
        pos = i;
      };
      if(i+1 === keys.length && counter < 5){

        selected_words.push({name:key_max,value:words[key_max]});
        keys[pos] = null;
        key_max = null;
        max = -1;
        i = 0;
        pos = -1;
        counter++;
      }
    }

    console.log( "keywords " + count);
    return {data:selected_words, status:'success',errors:''};
  },

  async get_Title(html){

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
    return {data:title, count:count, status:'success',errors:''};
  },
  async get_TitleMeta(){

    const html = await this.loadHtml();
    const title = await this.get_Title(html);
    const keywords = await this.get_keywords(html);
    const description = await this.get_description(html);
    const cloud = await this.get_wordFreqency(html);

    return {title: title,keywords:keywords,description:description,cloud:cloud, status:'success',errors:''};

  },

  async get_imgAlt(){
    const html = await this.loadHtml();
    let count = 0;
    let img_no_tag = [];
    try {
      html("img").map( function(){
        count++;
        let obj = {url: html(this).attr('src'),alt: html(this).attr('alt')};
        var isAlready = img_no_tag.filter(img_no_tag => (img_no_tag.url === obj.url));
        if(isAlready.length > 0){
        }else{
          img_no_tag.push(obj);
        }
        count++;
      }).get();

    }catch(e){
    };

    console.log('Total images:' + count);
    return { imgAlt: img_no_tag, status:'success',errors:''};


  }


};
