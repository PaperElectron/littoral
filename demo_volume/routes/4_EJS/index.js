module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index', {description: 'This value was set on the server on '+ new Date()});
  });

  return {
    name: 'EJS',
    teaserImage: 'ejs.png',
    description: 'EJS Templating. Its in here, but not for long, so I wouldn\'t use it.',
    title: 'EJS',
    basePath: '/ejs',
    extraClass: 'medium'
  }
};