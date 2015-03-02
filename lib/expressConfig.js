var path = require('path');
var cwd = process.cwd();
var static = require('express').static;

module.exports = function expressConfig(app){
  app.use(static(path.join(__dirname, '../', 'public')))
  app.set('views', path.join(__dirname, '../','views'));
  app.set('view engine', 'jade')
}