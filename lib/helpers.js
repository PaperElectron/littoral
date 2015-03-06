var _ = require('lodash');
var fs = require('fs');
var path = require('path')

module.exports = {
  siteData: undefined,

  getRenderer: function(path){
    var renderEngines = ['jade', 'hbs', 'ejs', 'html']
    var renderEngine;
    var viewTest = fs.readdirSync(path);
    var containsIndex = _.some(viewTest, function(f){
      var splitFile = f.split('.');
      if(splitFile[0] === 'index'){
        renderEngine = renderEngines[_.indexOf(renderEngines, splitFile[1])];
        return true
      }
    });

    return renderEngine
  },
  /**
   *  getWorkingPath
   *  Determines what path the server should use for settings, views and routes
   *  @returns {object}
   */
  getAppSettings: function(){
    var _this = module.exports

    if(_this.siteData){
      return _this.siteData
    }
    var env = process.env.NODE_ENV
    env = (env === 'production' || env === 'development' || env === 'test') ? env : 'production';

    var defaultPath = path.join(__dirname, '../', 'demo_volume');
    var workingPath = path.join(__dirname, '../', 'volume_data');

    var viewPath;
    var routesPath;
    var publicPath;
    var settings;
    var settingsPath;

    var pArgs = process.argv
    /*
     * If a path was passed in via cli lets try to use that.
     */
    if(pArgs[2]){
      workingPath = path.join(pArgs[2])
    }

    viewPath     = path.join(workingPath, 'views');
    routesPath   = path.join(workingPath, 'routes');
    publicPath   = path.join(workingPath, 'public');
    settingsPath = path.join(workingPath, 'settings.js')

    try {
      fs.statSync(settingsPath)
    }
    catch (e){
      console.log(settingsPath + ' does not exist, falling back to default.');
      settingsPath = path.join(defaultPath, 'settings.js')
    }
    try {
      fs.statSync(viewPath)
    }
    catch (e){
      console.log(viewPath + ' does not exist, falling back to default.');
      viewPath = path.join(defaultPath, 'views')
    }
    try {
      fs.statSync(routesPath)
    }
    catch (e){
      console.log(routesPath + ' does not exist, falling back to default.');
      routesPath = path.join(defaultPath, 'routes')
    }
    try {
      fs.statSync(publicPath)
    }
    catch (e){
      console.log(publicPath + ' does not exist, falling back to default.');
      publicPath = path.join(defaultPath, 'public');
    }

    var viewTest = fs.readdirSync(viewPath);
    var containsIndex = _.some(viewTest, function(f){
      var splitFile = f.split('.');
      if(splitFile[0] === 'index'){
        return true
      }
    });
    if(!containsIndex) {
      console.log(viewPath + ' Does not contain an index.jade/hbs/ejs/html file.');
      console.log('Please correct this by adding a valid index.jade/hbs/ejs/html file.');
      process.exit(1)
    }

    var settings = require(settingsPath)[env]
    if(settings === undefined){
      console.log(settingsPath)
      console.log('The settings file does not have a property matching "' + env + '"');
      process.exit(1)
    }
    if(settings.server === undefined){
      console.log('The settings file does not have a property matching "server"');
      console.log('Falling back to default values');
      settings.server = {}
      settings.server.port = 8080
    }

    this.siteData = {
      views: viewPath,
      routes: routesPath,
      public: publicPath,
      renderer: _this.getRenderer(viewPath),
      settings: settings
    }

    return _this.siteData
  }
};