const Tasks = require('../../models/SEO_tasks');

module.exports = (app) => {


  app.get('/task/h2', (req, res, next) => {
    const {body} = req;
    Tasks.gethtml(req);
    res.send({response: true, error: ''});
  });
  app.get('/task/h1', (req, res, next) => {

    res.sendStatus(200).json({status:'ok',error:''});

  });
  app.post('/task/html', (req, res, next) => {
    const {body} = req;
    const {web, uid} = body;
    res.sendStatus(200).json({status:'ok',error:''});

  });

}
