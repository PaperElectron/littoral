module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index', {description: 'This value was set on the server on '+ new Date()});
  });

  return {
    name: 'HBS',
    teaserImage: 'handlebars.jpeg',
    description: 'Handlebars Templating.',
    basePath: '/hbs'
  }
};