module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index');
  });

  return {
    name: 'HTML',
    teaserImage: 'html5.png',
    description: 'Plain HTML. No templating',
    basePath: '/html',
    extraClass: 'medium'
  }
};