/**
 * @file errorHandlers
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project littoral
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

module.exports = function(app){
  /*
   * Define error handlers last.
   */

  /*
   * 404
   */
  app.use(function(req, res, next){
    res.status(404)
    res.render('404', {title: '404 not found', url: req.url})
  });
  /*
   * 5xx
   */
  app.use(function(err, req, res, next){
    console.log(err.stack)
    res.status(err.status || 500)
    res.render('500', {title: 'Oh no!',status: err.status || 500})
  });
};