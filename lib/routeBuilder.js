var express = require('express');
var Router = express.Router;

var helpers = require('./helpers');
var getRenderer = helpers.getRenderer;
var appSettings = helpers.getAppSettings();
var sharedMiddleware = helpers.sharedMiddleware;

var fs = require('fs');
var path = require('path');

var _ = require('lodash')

/**
 *  @module routeBuilder
 *
 *  routeBuilder Builds a standalone express application from a module path.
 *
 *  @param {object} mainApp
 *  @param {string} modulePath
 *  @returns {object} sub application parameters.
 */

module.exports = function(mainApp, modulePath){

  var router = Router({strict: false});
  var static = express.static;
  var app = express();
  var viewDirectory = modulePath + '/views';
  var Renderer = getRenderer(viewDirectory);
  var teaserImage = false;

  //Hacky
  if(process.env.NODE_ENV === 'development') {
    app.locals.pretty = true;
    mainApp.locals.pretty = true;
  }

  //Pass our main site data to sub apps.
  app.locals.site = mainApp.locals.site;

  /*
   * This is the base path to the main apps view files.
   * It makes extending Jade templates much easier.
   */
  app.locals.basedir = mainApp.get('views');


  /*
   * Bring in our shared middlewares.
   */
  app = sharedMiddleware(app);



  app.set('views', modulePath + '/views');

  /*
   * If we get a template renderer back from the call to getRenderer all is good
   * we can just use it as is.
   */
  if(Renderer !== 'html') {
    app.set('view engine', Renderer)
  }

  /*
   * If not we are assuming .html and are going to override res.render to
   * pipe the file to the response object.
   */
  else {
    router.use('*', function(req, res, next) {
      if(Renderer === 'html') {
        res.render = function(view) {
          view = view + '.html';
          fs.createReadStream(path.join(viewDirectory, view)).pipe(res)
        }
      }
      next()
    });
  }

  var subApp = require(modulePath)(router);
  if(subApp.teaserImage){
    subApp.teaserImage = path.join(subApp.basePath, 'images', subApp.teaserImage)
  }
  app.locals.app = subApp
  app.locals.title = subApp.title
  app.use(subApp.basePath, router);
  app.use(subApp.basePath , static(modulePath + '/public'));
  mainApp.use(app)


  return subApp
};