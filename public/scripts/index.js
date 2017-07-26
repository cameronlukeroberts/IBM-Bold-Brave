window.onload = function() {
  setTimeout(myMoveRocket, 1000);
}

function myMoveRocket() {
  var elem = document.getElementById("rocket");
  var per = 80;

  var per_final = 100-(level/num_levels)*100-(1/num_levels)*100+2;

  var interval = 2;
  var frame_per_interval = 0.01;
  var id = setInterval(frameRocket, interval);
  function frameRocket() {
    if(per<= per_final)
        clearInterval(id);
    else {
      per-=frame_per_interval;
      if(per-4 <= per_final)
        frame_per_interval=0.02;
      else
        frame_per_interval+=0.01;

      elem.style.top = per + '%';
    }
  }
}

class Module
{
  constructor(n, p, c)
  {
    this.name = n;
    this.points = p;
    this.completed = c;
  }
}

function changeMiddleColumn(nmod)
{
  var newHtml = "";

  for(var i=0; i<modulesMat[nmod].length; i++)
  {
    newHtml += "<ul class='list-group'>";
    newHtml += "<a href='/activity.ejs' style='text-decoration: none;'>";
    //<li class="list-group-item <% if(i == 1){ %> list-group-item-success <% }else{ %> list-group-item-info <%} %>"> <div align="center"> modulo <%= i %> </div> </li>

    newHtml += "<li class='list-group-item ";
    if(modulesMat[nmod][i].completed)
     newHtml += "list-group-item-success'>";
    else
     newHtml += "list-group-item-info'>";

    newHtml += "<div align='center'>"+modulesMat[nmod][i].name+"</div>";

    newHtml += "</li>";
    newHtml += "</a>";
    newHtml += "</ul>";
  }

  document.getElementById("modulesTitle").innerHTML = "Current level: "+(nmod+1);
  document.getElementById("modulesList").innerHTML = newHtml;
}
