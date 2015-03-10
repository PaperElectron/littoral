var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var express = require('express')
var appSettings = require('./helpers').getAppSettings()
var router = express.Router;
var buildRoute = require('./routeBuilder');

module.exports = function(app){
  app.locals.apps = [];

  /*
   * Global variables sent to every page.
   */
  app.locals.site = appSettings.settings.globals
  //Setting this here so it can be over-ridden
  app.locals.title = app.locals.site.title

  var baseRoutePath = appSettings.routes
  var dynamicRoutes = fs.readdirSync(baseRoutePath)
  /*
   * Take a swing through our route directory, and load up every sub app we find.
   * Assign the parameters returned to app.locals.appProperties so we can build our front page.
   */
  _.each(dynamicRoutes, function(file){
    var modulePath = path.join(baseRoutePath, file)
    if(fs.statSync(modulePath).isDirectory() && file.indexOf('.') === -1){
      /*
       * Send a few things over to the route builder.
       */
      app.locals.apps.push( buildRoute(app, modulePath) );
    }
  })

}