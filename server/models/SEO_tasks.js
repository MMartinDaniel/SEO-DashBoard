const cheerio = require('cheerio');
const axios = require('axios');
const stopword = require('stopword');
const sslCertificate = require('get-ssl-certificate');
const relative = require('is-relative-url');
const forbiden  = [ '|','\n', '\n\n', '-' , ':',"ha", ":"];
const fetch = require('node-fetch');


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

  async loadHtml(url){

    
    let pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
      url = "http://" + url;
    }

    let html;
    try {

      await axios.get(url).then((response)=> {
        html = cheerio.load(response.data);
      });
    }catch(e){
    };
    return html;
  },

  async get_allHTags(url){
   const html = await this.loadHtml(url);
   const h1 = await this.check_Tag("h1",html);
   const h2 = await this.check_Tag("h2",html);
   const h3 = await this.check_Tag("h3",html);
   const h4 = await this.check_Tag("h4",html);
   const h5 = await this.check_Tag("h5",html);
   const h6 = await this.check_Tag("h6",html);

   return {h1: h1,h2:h2,h3:h3,h4:h4,h5:h5,h6:h6, status:'success',errors:''};
  },
  async get_meta(html){
    let meta = [];
    try {
      html("meta").map( function(){

        if(html(this).attr("name")){
          console.log(html(this).attr("name"));
          meta.push({name:html(this).attr("name"),value:html(this).attr('content')});
        }else if(html(this).attr("http-equiv")){
          console.log(html(this).attr("http-equiv"));
          meta.push({name:html(this).attr("http-equiv"),value:html(this).attr('content')});
        }else if(html(this).attr("property")){
          console.log(html(this).attr("property"));
          meta.push({name:html(this).attr("property"),value:html(this).attr('content')});
        }
        
      }).get();

    }catch(e){};
    console.log("metas:")
    console.log(meta);
    console.log("endmeta")
    return {meta:meta, status:'success',errors:''};
  },

  async get_allTags(url){
    const html = await this.loadHtml(url);
    const h1 = await this.check_Tag("h1",html);
    const h2 = await this.check_Tag("h2",html);
    const h3 = await this.check_Tag("h3",html);
    const h4 = await this.check_Tag("h4",html);
    const h5 = await this.check_Tag("h5",html);
    const h6 = await this.check_Tag("h6",html);
    const canonical = await this.get_canonicalTag(url);
    const lang = await this.get_lang(url);
    return {h1: h1,h2:h2,h3:h3,h4:h4,h5:h5,h6:h6, canonical:canonical.canonical, lang:lang.lang, status:'success',errors:''};
   },
   async get_lang(url){
    const html = await this.loadHtml(url);
    let lang = "";
    try {
       lang = html("html").attr("lang");
    }catch(e){};
    console.log( "lang " + lang);
    return {lang:lang, status:'success',errors:''};
  },
 
   async get_canonicalTag(url){
    const html = await this.loadHtml(url);
    let canonical = "";
    try {
      html("link[rel=canonical]").map( function(){
        canonical =  html(this).attr('href');
      }).get();

    }catch(e){};
    console.log( "canonical " + canonical);
    return {canonical:canonical, status:'success',errors:''};
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
    if(count === 0){
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
        const parsed_text_nofilt = stopword.removeStopwords(text,stopword.es);
        
        let parsed_text = parsed_text_nofilt.filter( function( el ) {
          return !forbiden.includes( el );
        } );
        
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
    console.log(selected_words);
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

  async get_certificate(url){
    let cert;
    url = url.replace(/(^\w+:|^)\/\//, '');
    try {
    await sslCertificate.get(url).then(function (certificate) {
        cert = certificate;
      })
    }catch (e) {
      cert =  null;
    }
    return cert;
  },
  async get_favicon(html){
    let count = 0;
    let favicon_list = [];
    let favicon;
    try {
      html("link").map( function(){
        count++;
        favicon = (html(this).attr('rel').includes('icon')) ? html(this) : null;
        if(favicon !== null){
          favicon_list.push({name: favicon.attr('rel'), href: favicon.attr('href')});
        }
      }).get();

    }catch(e){
      return e;
    }
    return {data:favicon_list, count:count, status:'success',errors:''};
  },

  async get_performance(url){

    let pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
      url = "http://" + url;
    }
    return fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='+url+'&category=performance').then(response => response.json())
      .then(data => {
         let parsed_data = [];
         let total_size = 0;
         data.lighthouseResult.audits['network-requests'].details.items.forEach( item =>{
          total_size += item.transferSize;
          if(item.resourceType === "Stylesheet" || item.resourceType === 'Script'){
            let filename = item.url.substring(item.url.lastIndexOf('/')+1);
            parsed_data.push({deadlink:item,status:false,where:item.url,name:filename});
          }
        });
        data.lighthouseResult.audits['minify'] = parsed_data;
        data.lighthouseResult.audits['totalsize'] = total_size;
        return data.lighthouseResult.audits
      });
    },

  async get_headers(url){
    
    let pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
      url = "http://" + url;
    }
   return fetch(url, {
      method: 'GET',
      compress: true,
     }).then(data => {
        let headers = data.headers;
        console.log(data);
       return {cachecontrol: headers.get('cache-control'), contentencoding: headers.get("content-encoding"), contentlength: headers.get("content-length"), expires: headers.get("expires"), status:data.status, url:data.url } ;
    })
    
  },

  async get_TitleMeta(url){
    
    let pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
      url = "http://" + url;
    }
    const html = await this.loadHtml(url);
    const title = await this.get_Title(html);
    const keywords = await this.get_keywords(html);
    const description = await this.get_description(html);
    const cloud = await this.get_wordFreqency(html);
    const favicon = await this.get_favicon(html);
    const meta = await this.get_meta(html);
    return {title: title,keywords:keywords,favicon:favicon,description:description,cloud:cloud,meta:meta.meta, status:'success',errors:''};

  },

  async get_hyperlinks(url){
    const html = await this.loadHtml(url);
    let hyperlinks = {count: 0, internal : 0,nofollow: 0, external:0, nofe:0};
    html("a[href]").map( function(){
      console.log(html(this).attr('href'));
      if((html(this).attr('href')).includes(url)){

        if(html(this).attr('rel') === 'nofollow'){
          hyperlinks.nofollow++;
        }else{
          hyperlinks.internal++;
        }
      }else{

        if(html(this).attr('rel') === 'nofollow'){
          hyperlinks.nofe++;
        }else{
          hyperlinks.external++;
        }
      }

      hyperlinks.count++;

    }).get();

    console.log('total count ' + hyperlinks.count);
    return { hyperlinks: hyperlinks, status:'success',errors:''};

  },

  async get_imgAlt(url){

    const html = await this.loadHtml(url);
    let count = 0;
    let img_no_tag = [];
    function api_call(item){
      return new Promise(function(resolve,reject){
        count++;
        let obj = {url: item.attr('src'),alt: item.attr('alt')};
        var isAlready = img_no_tag.filter(img_no_tag => (img_no_tag.url === obj.url));
        if(!isAlready.length > 0){
          img_no_tag.push(obj);
        }
        resolve(item);
      });
    }
    let promises = [];

    try {
      html("img").map( function(){
        promises.push(api_call(html(this)));
      }).get();

    }catch(e){
      console.log(e);
    }
    return Promise.all(promises).then((results)=>{
      console.log('Total images:' + count);
      return { imgAlt: img_no_tag, status:'success',errors:''};
    });

    /*
        const html = await this.loadHtml(url);
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

    */
  }


};
