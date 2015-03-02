var router = require('express').Router();
var routes = {};


module.exports = function expressRoutes(app){

  router.get('/', function(req, res) {
    res.render('index', {apps: app.locals.appProperties});
  });

  app.use('/', router);
}