function initProfile()
{
  var result;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "/api/position/"+usr, false);
  xhttp.send();
  result=result[0];

  document.getElementById("profileInfo").innerHTML = userName;
  document.getElementById("profilePoints").innerHTML = "Points: "+userPoints;
  document.getElementById("profilePosition").innerHTML = "Position: "+result;

  document.getElementById("profilePic").src = profileImg;

  var newHtml="";

  var num_rows = (levelsArr.length/5) +1;
  var supp=0;
  for(var j=0;j<num_rows;j++){
    newHtml += '<div class="row">';
    newHtml+= '<div class="col-sm-1"></div>';
    //<div class="col-sm-2"  id="graf1" style="text-align: center;"><div class="test-btn btn-no-padding">Moonshot Maverick</div></div>
    for(var i=0; supp+i<levelsArr.length; i++){
      newHtml += "<div class='col-lg-2'  id='graf"+(supp+i+1)+"' style='text-align: center;'><div class='div-btn-style'><span>"+levelsArr[supp+i].name+"</span></div></div>";

    }
    supp+=5;
    newHtml += '<div class="col-sm-1"></div>';
    newHtml+='</div>';
  }

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


function openUpload(){
  console.log("ok");
  $('#imageLoad').trigger('click');
  //$('#imageLoad').css('visibility','visible');
}
