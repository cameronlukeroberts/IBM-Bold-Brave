function initProfile()
{
  document.getElementById("profileInfo").innerHTML = userName;
  document.getElementById("profilePoints").innerHTML = "Points: "+userPoints;
  document.getElementById("profilePosition").innerHTML = "Position: "+userPoints/2;
}

$(document).ready(function(){
  var chart=$('#svg1');
  var cont=chart.parent();
  var w=$(cont).width();
  var h=$(cont).height();
  $(chart).width(w);
  $(chart).height(h);
  makeGraph(w, h);
  $(window).on('resize', function(){
    var w=$(cont).width();
    var h=$(cont).height();
    $(chart).width(w);
    $(chart).height(h);
    document.getElementById("svg1").innerHTML="";
    makeGraph(w, h);
  });
});
