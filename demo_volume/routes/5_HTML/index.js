module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index');
  });

  return {
    name: 'HTML',
    description: 'You can also use plain HTML.',
    title: 'HTML',
    basePath: '/html',
    //Optional
    teaserImage: 'html5.png'
  }
};