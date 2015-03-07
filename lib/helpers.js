/*
 * Some of the more pedantic Node.js aficionados will note that the methods
 * in this file have a ton of file and path manipulation going on. They will
 * also lament about how nearly none of it is Async.
 *
 * Everything in this file is called at or before application startup, and the paths
 * that these methods return are essential for the server to run at all.
 *
 * So Three choices,
 * 1.) make a giant callback chain, handling errors as I go.
 * 2.) Essentially the same thing but with promises. Still have to handle errors as I go,
 * because I need to set defaults.
 * 3.) Do everything synchronously, handle errors in the stack they were generated in
 * using the language constructs JS provides out of the box?
 *
 * Its obvious that choice 3 is the correct one, at least to me. If someone wants to fork
 * this app and rewrite all of this stuff using Async API's, along with tests, be my guest.
 */

var _ = require('lodash');
var fs = require('fs');
var path = require('path')

module.exports = {
  defaultPath: path.join(__dirname, '../', 'demo_volume'),
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
   * getTheme
   *
   * Returns a fully qualified path to the requested theme directory,
   * if not found returns fully qualified path to the default theme.
   *
   * @param themesPath validated path to themes directory.
   * @param themeName desired name of theme to load.
   * @returns {string} path
   */

  getTheme: function(themesPath, themeName){
    if(_.isEmpty(themesPath)) { throw new Error('Missing themesPath parameter') };

    var _this = module.exports;
    var themeDirs = fs.readdirSync(themesPath);
    var foundThemeDir = path.join(_this.defaultPath, 'themes', 'littoral-demo-theme')

    /*
     * Traverse the found theme directories, try to require any package.json file
     * inside. If the name property matches return that path as our theme directory.
     */
    if(themeDirs.length > 0) {
      _.each(themeDirs, function(dir) {
        var p = path.join(themesPath, dir);
        var pkg = path.join(p, 'package.json');
        try {
          pkg = require(pkg).name
          if(pkg === themeName) {
            return foundThemeDir = p
          }
        } catch (e) {
          _.noop()
        }
      })
    }
    return foundThemeDir
  },
  /**
   *  getWorkingPath
   *  Determines what path the server should use for settings, views and routes
   *
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
    var workingPath

    var theme;
    var themesPath;
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
    else {
      workingPath = path.join(process.env.HOME, '.littoral')
      try {
        fs.statSync(workingPath)
      }
      catch (e){
        console.log(workingPath + ' does not exist, falling back to default.');
        workingPath = path.join(defaultPath)
      }
    }

    var applicationPaths = {
      "settings.js": path.join(workingPath, 'settings.js'),
      themes:        path.join(workingPath, 'themes'),
      routes:        path.join(workingPath, 'routes')
    };

    /*
     * Validate the application paths, if any fail we set them back to the default.
     */
    _.each(applicationPaths, function(v, k){
      try {
        fs.statSync(v)
      }
      catch (e){
        console.log(v + ' does not exist, falling back to default.');
        applicationPaths[k] = path.join(defaultPath, k)
      }
    });

    /*
     * Get and validate the settings file.
     */
    var settings = require(applicationPaths['settings.js'])[env]
    if(settings === undefined){
      console.log(applicationPaths['settings.js'])
      console.log('The settings file does not have a property matching "' + env + '"');
      process.exit(1)
    }
    /*
     * If we don't have a server property something went very wrong.
     */
    if(settings.server === undefined){
      console.log('The settings file does not have a property matching "server"');
      console.log('Falling back to default values');
      settings.server = {}
      settings.server.port = 8080
    }

    var themeDir = _this.getTheme(path.join(applicationPaths.themes), settings.theme)

    var themePaths = {
      views:    path.join(themeDir, 'views'),
      public:   path.join(themeDir, 'public')
    };

    _.each(themePaths, function(v, k){
      try {
        fs.statSync(v)
      }
      catch (e){
        console.log(v + ' does not exist, falling back to default.');
        themePaths[k] = path.join(defaultPath, 'themes', 'littoral-demo-theme',k)
      }
    });


    var viewTest = fs.readdirSync(themePaths.views);
    var containsIndex = _.some(viewTest, function(f){
      var splitFile = f.split('.');
      if(splitFile[0] === 'index'){
        return true
      }
    });
    if(!containsIndex) {
      console.log(themePaths.views + ' Does not contain an index.jade/hbs file.');
      console.log('Please correct this by adding a valid index.jade/hbs file.');
      process.exit(1)
    }


    _this.siteData = {
      views: themePaths.views,
      routes: applicationPaths.routes,
      public: themePaths.public,
      renderer: _this.getRenderer(themePaths.views),
      settings: settings
    }

    return _this.siteData
  }
};