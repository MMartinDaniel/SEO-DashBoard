const Minifier = require('../../models/Minifier');
let resources = [];
const request = require('request');

module.exports = (app) => {

  app.get('/api/minifier/minify',async (req, res, next) => {
    console.log(req.query);
    let minified = await Minifier.minifyJSCSS(req.query.url,req.query.type);
    let filename = req.query.url.substring(req.query.url.lastIndexOf('/')+1);
    res.set({"Content-Disposition":"attachment; filename="+filename});
    res.send(minified);
  });
  app.post('/api/minifier/minified',async (req, res, next) => {
    const {body} = req;
    const { data  } = body;
    let minified_items = await Minifier.checkIfMinify(data);
    console.log(minified_items);
    res.send(minified_items);
  });

};
