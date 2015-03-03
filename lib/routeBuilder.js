var express = require('express');
var Router = express.Router;
var getRenderer = require('./helpers').getRenderer
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

  var router = Router();
  var static = express.static;
  var app = express();
  var viewDirectory = modulePath + '/views';
  var Renderer = getRenderer(viewDirectory);
  var teaserImage = false;

  app.use(static(modulePath + '/public'));
  app.set('views', modulePath + '/views');

  /*
   * If we get a template renderer back from the call to getRenderer all is good
   * we can just use it as is.
   */
  if(Renderer !== 'html') {
    app.set('view engine', Renderer, {pretty: true})
  }

  /*
   * If not we are assuming .html and are going to override res.render to
   * pipe the file to the response object.
   */
  router.use('*', function(req, res, next){
    if(Renderer === 'html') {
      res.render = function(view) {
        view = view + '.html';
        fs.createReadStream(path.join(viewDirectory, view)).pipe(res)
      }
    }
    next()
  });

  var subApp = require(modulePath)(router)

  app.use('/', router)
  mainApp.use(subApp.basePath, app)


  if(subApp.teaserImage){
    subApp.teaserImage = path.join(subApp.basePath, 'images', subApp.teaserImage)
  }

  return subApp
};