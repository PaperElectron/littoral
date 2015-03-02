var router = require('express').Router();
var routes = {};

routes.index = function(req, res){
  res.render('index');
};

module.exports = function expressRoutes(app){
  router.get('/', routes.index);
  app.use('/', router);
}