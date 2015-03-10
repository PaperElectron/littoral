module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index', {description: 'This value was set on the server on '+ new Date()});
  });

  return {
    name: 'EJS',
    teaserImage: 'ejs.png',
    description: 'EJS Templating.',
    title: 'EJS',
    basePath: '/ejs',
    extraClass: 'medium'
  }
};