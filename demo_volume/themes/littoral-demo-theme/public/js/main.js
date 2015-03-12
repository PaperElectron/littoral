$(function(){

  var pack = $('.arrange')
  pack.hide()

  pack.imagesLoaded(function(){
    pack.show()
    pack.packery({
      itemSelector: '.demo',
      transitionDuration: '0.5s'
    })
  });

  pack.packery('bindResize')

});