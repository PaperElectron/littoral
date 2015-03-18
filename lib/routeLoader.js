/**
 * @file routeLoader
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project littoral
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

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

  /**
   *
   * @param currentPath
   * @param expressBase
   * @returns {Array}
   */
  var walk = function(currentPath, expressBase) {
    var subAppData = []

    var currentSubApplication;
    var dirs = fs.readdirSync(currentPath);
    if(dirs.indexOf('routes') >= 0) {

      var subDirs = fs.readdirSync(path.join(currentPath, 'routes'));
      _.each(subDirs, function(sub) {

        var subModulePath = path.join(currentPath, 'routes', sub);

        /*
         * Ignore anything that isn't a directory or is a dotfile.
         * I had some issues here with .DS_Store files on OSX here.
         */
        if(fs.statSync(subModulePath).isDirectory() && sub.indexOf('.') === -1){

          /*
           * Pass our current express application and the path to the submodule
           * to our routeBuilder.
           */
          var current = buildRoute(expressBase, subModulePath);
          currentSubApplication = current.appData;

          /*
           * Use the still existing reference to the parent module
           * to add some additional properties the child can use.
           */
          currentSubApplication.parentPath = expressBase.absolutePath;

          /*
           * The actual express app returned by the routeBuilder.
           */
          subApplication = current.expressApp;

          /*
           * Recurse further into the directory structure.
           */
          currentSubApplication.subApplications = walk(subModulePath, subApplication)
        }
        else {
          return
        }

        subAppData.push(currentSubApplication)

      });

      /*
       * Override the apps variable on the current express app.
       * This allows the apps variable to hold all of the current
       * sub applications for that route.
       */
      expressBase.locals.apps = subAppData
    }
    return subAppData
  };

  applicationData.subApplications = walk(modulePath, baseApplication)
  return applicationData

};