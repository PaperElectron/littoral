var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var express = require('express')
var router = express.Router;
var buildRoute = require('./routeBuilder');

module.exports = function(app){
  app.locals.appProperties = [];

  var pArgs = process.argv
  var dynamicRoutes;
  var baseRoutePath;

  if(pArgs[2]){
    baseRoutePath = path.join(pArgs[2],'routes')
  }
  else{
    baseRoutePath = path.join(__dirname, '../volume_data','routes')
  }

  try {
    dynamicRoutes = fs.readdirSync(baseRoutePath);

  }
  catch (e){
    console.log(baseRoutePath + ' does not exist, falling back to default.');
    baseRoutePath = path.join(__dirname, '../','demo_volume','routes')
    dynamicRoutes = fs.readdirSync(baseRoutePath)
  }

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

      app.locals.appProperties.push( buildRoute(app, modulePath) );
    }
  })

}