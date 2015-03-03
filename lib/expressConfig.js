var path = require('path');
var fs = require('fs');
var cwd = process.cwd();
var static = require('express').static;
var _ = require('lodash');

var pArgs = process.argv
var basePublicPath;
var baseViewPath;
var renderEngines = ['jade', 'hbs', 'ejs']
var renderEngine;

if(pArgs[2]){
  /*
   * This is really just for local development and testing.
   *
   */
  baseViewPath = path.join(pArgs[2],'views')
  basePublicPath = path.join(pArgs[2],'public')
}
else{
  /*
   * Specifies the view path and public routes for main page. With no arguments passed in this is the default.
   */
  baseViewPath = path.join(__dirname, '../volume_data','views')
  basePublicPath = path.join(__dirname, '../volume_data','public')

}
/*
 * If these directories exist, use them. If not fall back to the application defaults.
 */
try {
  fs.statSync(basePublicPath)
}
catch (e){
  //Fallback to demo_volume/public
  console.log(basePublicPath + ' does not exist, falling back to default.');
  basePublicPath = path.join(__dirname, '../','demo_volume', 'public')
}
try {
  fs.statSync(baseViewPath)
}
catch (e){
  //Fallback to demo_volume/views
  console.log(baseViewPath + ' does not exist, falling back to default.');
  baseViewPath = path.join(__dirname, '../','demo_volume','views')
}

/*
 * Check to see that the path being used for views does have an index file.
 * If it doesn't we obviously cannot proceed.
 */

var viewTest = fs.readdirSync(baseViewPath);
var containsIndex = _.some(viewTest, function(f){
  var splitFile = f.split('.');
  if(splitFile[0] === 'index'){
    renderEngine = renderEngines[_.indexOf(renderEngines, splitFile[1])];
    return true
  }
});
if(!containsIndex) {
  console.log(baseViewPath + ' Does not contain an index.jade/hbs/ejs file.');
  console.log('Please correct this by adding a valid index.jade/hbs/ejs file.');
  process.exit(1)
}
if(renderEngine === undefined){
  console.log('The index view file does not have extension <jade/hbs/ejs>')
  console.log('This is probably not what you wanted.')
  process.exit(1)
}

module.exports = function expressConfig(app){
  app.use(static(basePublicPath));
  app.set('views', baseViewPath);
  app.set('view engine', renderEngine)
}