//https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=http://instantes.net&category=performance
const Minifier = require('../../models/Minifier');
let resources = [];
const request = require('request');

module.exports = (app) => {

  app.get('/api/minifier',async (req, res, next) => {
    const {body} = req;
    let minified = await Minifier.minifyCSS(req.query.url);
    let filename = req.query.url.substring(req.query.url.lastIndexOf('/')+1);
    res.set({"Content-Disposition":"attachment; filename="+filename});
    res.send(minified);
  });


};
