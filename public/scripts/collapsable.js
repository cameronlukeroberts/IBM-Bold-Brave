$(document).ready(function(){
  var trig=$('.collapse-trigger');
  trig.click(function(){
    var coll_container=$(this).parents('.collapse-container');
    var cont=$(coll_container).find('.collapsable');

    if(!$(cont).hasClass('active')){
      $('.active').slideUp();
      $(cont).slideDown();
      $('.collapsable').removeClass('active');
      $(cont).addClass('active');
    }
    else{
      $(cont).slideUp();
      $(cont).removeClass('active');
    }
  });
});
