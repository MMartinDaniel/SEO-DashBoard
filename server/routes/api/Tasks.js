const Tasks = require('../../models/SEO_tasks');

module.exports = (app) => {


  app.get('/task/h2', async (req, res, next) => {

    let h2_elements = await Tasks.check_h2Tag();
    res.send({response: true, error: '', data: h2_elements});

  });
  app.get('/task/h1', async (req, res, next) => {

    let h1_elements = await Tasks.check_h1Tag();
    res.send({response: true, error: '', data: h1_elements});
  });

  app.get('/task/title', async (req, res, next) => {

    let data = await Tasks.get_Title();
    res.send({response: true, error: '', data: data});
  });
  app.get('/task/cert', async (req, res, next) => {
    let url = "forocoches.com";
    let data = await Tasks.get_certificate(url);
    res.send({response: true, error: '', data: data});
  });

  app.get('/task/hyperlinks', async (req, res, next) => {
    let url = "instantes.net";
    let data = await Tasks.get_hyperlinks(url);
    res.send({response: true, error: '', data: data});
  });

  app.get('/task/description', async (req, res, next) => {

    let data = await Tasks.get_description();
    res.send({response: true, error: '', data: data});
  });
  app.get('/task/keywords', async (req, res, next) => {

    let data = await Tasks.get_keywords();
    res.send({response: true, error: '', data: data});
  });
  app.get('/task/wordFreqency', async (req, res, next) => {

    let data = await Tasks.get_wordFreqency();
    res.send({response: true, error: '', data: data});
  });

  app.get('/task/TitleMeta', async (req, res, next) => {

    let data = await Tasks.get_TitleMeta();
    res.send({response: true, error: '', data: data});
  });
  app.get('/task/imgNoAlt', async (req, res, next) => {
    const { query } = req;
    let {url} = query;
    let data = await Tasks.get_imgAlt(url);
    console.log(data);
    res.send({response: true, error: '', data: data});
  });


  app.get('/task/h', async (req, res, next) => {
    let h_elements = await Tasks.get_allHTags();
    res.send({response: true, error: '', data: h_elements});

  });
  app.post('/task/html', (req, res, next) => {
    const {body} = req;
    const {web, uid} = body;
    res.sendStatus(200).json({status:'ok',error:''});

  });

}
