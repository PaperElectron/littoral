var static = require('express').static;

var appSettings = require('./helpers').getAppSettings()

var basePublicPath = appSettings.public;
var baseViewPath = appSettings.views;
var renderEngine = appSettings.renderer;


if(renderEngine === undefined || renderEngine === 'html'){
  console.log('The index view file does not have extension <jade/hbs/ejs>')
  console.log('This is probably not what you wanted.')
  process.exit(1)
}


module.exports = function expressConfig(app){
  app.locals.pretty = true
  app.use(static(basePublicPath));
  app.set('views', baseViewPath);
  app.set('view engine', renderEngine)
};