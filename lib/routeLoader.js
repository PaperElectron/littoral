var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var express = require('express')
var router = express.Router;

module.exports = function(app){
  app.locals.appProperties = [];
  var dynamicRoutes = fs.readdirSync(path.join(__dirname, '../','routes'));
  _.each(dynamicRoutes, function(file){
    var modulePath = path.join(__dirname, '../','routes', file)
    if(fs.statSync(modulePath).isDirectory()){
      var subApp = require(modulePath)(express)
      app.use(subApp.basePath, subApp.app)
      app.locals.appProperties.push({
        name: subApp.name,
        path: subApp.basePath,
        description: subApp.description
      })
    }
  })
}