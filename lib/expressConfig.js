/**
 * @file expressConfig
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project littoral
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var static = require('express').static;

var helpers = require('./helpers');
var appSettings = helpers.getAppSettings();
var sharedMiddleware = helpers.sharedMiddleware;

var responseTime = require('response-time');
var compress = require('compression');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var basePublicPath = appSettings.public;
var faviconPath = appSettings.favicon
var baseViewPath = appSettings.views;
var renderEngine = appSettings.renderer;


if(renderEngine === undefined || renderEngine === 'html'){
  console.log('The index view file does not have extension <jade/hbs/ejs>');
  console.log('This is probably not what you wanted.');
  process.exit(1);
}


module.exports = function expressConfig(app){
  app.use(favicon(faviconPath))
  app.locals.pretty = true;
  app.use(responseTime());
  app.use(compress());
  app = sharedMiddleware(app);
  app.use(morgan('common'));
  app.use(static(basePublicPath));
  app.set('views', baseViewPath);
  app.set('view engine', renderEngine);
};