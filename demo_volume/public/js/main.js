$(function(){

  var pack = $('.arrange').hide()
  pack.imagesLoaded(function(){
    pack.show()
    pack.packery({
      itemSelector: '.demo'
      //columnWidth: '.sizer'
    })

  });

});