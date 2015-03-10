module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index', {description: 'This value was set on the server on '+ new Date()});
  });

  return {
    name: 'Handlebars Templating',
    description: 'HBS is the next most preffered templating engine.',
    title: 'Handlebars',
    basePath: '/hbs',
    //Optional
    teaserImage: 'handlebars.jpeg'
  }
};