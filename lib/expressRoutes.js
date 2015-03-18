/**
 * @file expressRoutes
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project littoral
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var router = require('express').Router();
var routes = {};


module.exports = function expressRoutes(app){

  router.get('/', function(req, res) {
    res.render('index');
  });

  app.use('/', router);
}