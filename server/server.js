const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
bodyParser = require('body-parser'); // cuidado

const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;

// Configuracion
// ================================================================================================

// configuracion Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const app = express();
//Socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(80);
app.set('socketio',io);
io.on('connection', function (socket) {
    socket.emit("MyApp",{response:'saludos hermano'});
  //socket.emit('news', { hello: 'worldbb' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

//=========

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json({limit: '10mb', extended: true}))        //cuidado conestas 2
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));



// API routes
require('./routes')(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = {app,io};
