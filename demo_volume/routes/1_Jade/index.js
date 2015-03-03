module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index', {description: 'This value was set on the server on '+ new Date()});
  });

  return {
    //Required
    name: 'Jade',
    description: 'Jade Templating.',
    basePath: '/jade',
    //Optional
    teaserImage: 'jade.png',
    extraClass: 'full'
  }
};