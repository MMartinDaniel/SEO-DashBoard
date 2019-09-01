var webshot = require('node-webshot');
var fs      = require('fs');
const captureWebsite = require('capture-website');

var options_phone = {

  screenSize: {
    width: 375 //320
    , height: 420 //420
  }
  , shotSize: {
    width: 375 // 320
    , height: 'all' //'all'
  }
  , userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
};
var options_desktop = {

  screenSize: {
    width: 1920
    , height: 1080
  }
  , shotSize: {
    width: 1920
    , height: 'all'
  }, renderDelay: 5000
  , userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
};

//asignamos opciones para tablet
var options_tablet = {

  screenSize: {
    width: 1024
    , height: 'all'
  }
  , shotSize: {
    width: 1024
    , height: 'all'
  }
  , userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    + 'AppleWebKit/537.36 (KHTML, like Gecko)'
    + 'Chrome/60.0.3112.113' + 'Safari/537.36'
};

module.exports = {
  createWebShoot: async function(url,req,uid){
    var file = uid+".jpeg";
    var location = 'client/public/assets/img/webshots/';
    console.log('generating...webshotfile-'+uid + " in: "+location+"tablet-"+file);
    var io = req.app.get('socketio');
    webshot(url,location+"tablet-"+file, options_tablet, function(err) {
      console.log('tablet generated');
      io.emit('webshotfile-'+uid,"tablet-"+file);
    });
    webshot(url,location+"desktop-"+file, options_desktop, function(err) {
      console.log('desktop generated');
      io.emit('webshotfile-'+uid,"desktop-"+file);
    });

    webshot(url,location+"phone-"+file, options_phone, function(err) {
      console.log('pphone generated');
      io.emit('webshotfile-'+uid,"phone-"+file);
    });
  },
  createWebShootReport: async function(url,id){
    //generamos las distintas imagenes, y las guardamos
    var file = id+".jpeg";
    var location = 'client/public/assets/img/webshots/';
    webshot(url,location+"tablet-"+file, options_tablet, function(err) {
      console.log('tablet generated');
    });
    webshot(url,location+"desktop-"+file, options_desktop, function(err) {
      console.log('desktop generated');
    });

    webshot(url,location+"phone-"+file, options_phone, function(err) {
      console.log('phone generated');
    });
    console.log({   tabletPic: `${location}tablet-${file}` ,phonePic: `${location}phone-${file}` , desktopPic: `${location}desktop-${file}` });
    return {   tabletPic: `tablet-${file}` ,phonePic: `phone-${file}` , desktopPic: `desktop-${file}` };

  },
  async createNeWebshot(url,id){
    let pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
      url = "http://" + url;
    }
    var file = id+".jpeg";
    var location = 'client/public/assets/img/webshots/';
    try {
      fs.unlinkSync(location+"phone-"+file);
      fs.unlinkSync(location+"tablet-"+file);
      fs.unlinkSync(location+"desktop-"+file);
      //file removed
    } catch(err) {
      console.error(err)
    }
    //generamos las distintas imagenes, y las guardamos
 
    captureWebsite.file(url, location+"phone-"+file, {
      emulateDevice: 'iPhone X',
      quality: 0.1,
      type: "jpeg",
    });
    captureWebsite.file(url, location+"tablet-"+file, {
      emulateDevice: 'iPad Pro',
      quality: 0.1,
      type: "jpeg"
    });
    captureWebsite.file(url, location+"desktop-"+file, {
      quality: 0.1,
      type: "jpeg"
    });
    console.log("new");
    console.log({   tabletPic: `${location}tablet-${file}` ,phonePic: `${location}phone-${file}` , desktopPic: `${location}desktop-${file}` });
    return {   tabletPic: `tablet-${file}` ,phonePic: `phone-${file}` , desktopPic: `desktop-${file}` };
  }

};


