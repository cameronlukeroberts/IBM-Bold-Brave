$(document).ready(function(){
  $('.rounded-container img').each(function(){
    $(this).addClass(this.width > this.height ? 'rounded-landscape' : 'rounded-portrait');
  });
});
