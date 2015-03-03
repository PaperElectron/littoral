module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index', {description: 'This value was set on the server on '+ new Date()});
  });

  return {
    name: 'Jade',
    teaserImage: 'jade.png',
    description: 'Jade Templating.',
    basePath: '/jade'
  }
};