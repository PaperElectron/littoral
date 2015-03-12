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
      app.locals.basedir = app.get('views')
      app.locals.apps.push( walkTree(app, modulePath) );
    }
  })

}
/**
 *
 * @param app
 * @param modulePath
 * @returns {*|subApp|exports}
 */
function walkTree(app, modulePath){
  /*
   * First we need to mount the base app, it returns a reference
   * to the express application that was used to create it.
   */

  var mountedApp = buildRoute(app, modulePath)
  var applicationData = mountedApp.appData
  var baseApplication = mountedApp.expressApp
  /*
   * This is the express instance that will be used in our
   * recursive loader, it will be replaced by further calls
   * to buildRoute()
   */
  var subApplication = baseApplication


  var walk = function(p, expressBase) {
    var subAppData = []

    var currentSubApplication;
    var dirs = fs.readdirSync(p);
    if(dirs.indexOf('routes') >= 0) {

      var subDirs = fs.readdirSync(path.join(p, 'routes'))
      _.each(subDirs, function(sub) {
        var subModulePath = path.join(p, 'routes', sub)
        if(fs.statSync(subModulePath).isDirectory() && sub.indexOf('.') === -1){
          var current = buildRoute(expressBase, subModulePath)
          currentSubApplication = current.appData
          subApplication = current.expressApp
        }
        currentSubApplication.subApplications = walk(subModulePath, subApplication)

        subAppData.push(currentSubApplication)

      })

      expressBase.locals.apps = subAppData
    }
    return subAppData
  };

  applicationData.subApplications = walk(modulePath, baseApplication)
  return applicationData

};