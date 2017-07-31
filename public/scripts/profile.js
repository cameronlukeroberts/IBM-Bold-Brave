function initProfile()
{
  document.getElementById("profileInfo").innerHTML = userName;
  document.getElementById("profilePoints").innerHTML = "Points: "+userPoints;
  document.getElementById("profilePosition").innerHTML = "Position: "+userPoints/2;

  var newHtml = "";
  //<div class="col-sm-2"  id="graf1" style="text-align: center;"><div class="test-btn btn-no-padding">Moonshot Maverick</div></div>
  for(var i=0; i<levelsArr.length; i++)
    newHtml += "<div class='col-sm-2'  id='graf"+(i+1)+"' style='text-align: center;'><div class='test-btn btn-no-padding'>"+levelsArr[i].name+"</div></div>";
  document.getElementById("grafContainer").innerHTML = newHtml;  
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
