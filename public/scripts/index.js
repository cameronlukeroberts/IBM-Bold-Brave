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

var actual_level_list;

var levelsArr = new Array(5);
var userPoints = 23;

function init()
{
  for(var i=0; i<5; i++)
   levelsArr[i] = {name:"level "+(i+1), points:i*10, perComp:Math.floor(100/(i+1))};

  var level;
  var num_levels = <%= levelsArr.length %>;

  var modulesMat = new Array(num_levels);
  <% for(var i=0; i<levelsArr.length; i++) %>
  modulesMat[i] = new Array(<%= modulesMat[i].length %>);

  for(var i=0; i<num_levels; i++) //inserire dati db
    for(var j=0; j<i+1; j++)
      modulesMat[i][j] = new Module("modulo"+i+""+j, i*j, i==j);

   <%
     var level;
     for(level=0; level<levelsArr.length && levelsArr[level].points <= userPoints; level++);
     level--;
   %>
    level = <%= level %>;
}

function decreaseLevel()
{
  actual_level_list = (actual_level_list + level)%(level+1);
  changeMiddleColumn(actual_level_list);
}

function increaseLevel()
{
  actual_level_list = (actual_level_list + 1)%(level+1);
  changeMiddleColumn(actual_level_list);
}

function changeMiddleColumn(nmod)
{
  actual_level_list = nmod;
  var newHtml = "";

  for(var i=0; i<modulesMat[nmod].length; i++)
  {
    newHtml += "<ul class='list-group'>";
    newHtml += "<a href='/activity/"+nmod+"/"+i+"' style='text-decoration: none;'>";

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
