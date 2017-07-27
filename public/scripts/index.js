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
var userPoints = 25;
var level, num_levels;
var modulesMat;

function init()
{
  for(var i=0; i<5; i++)
   levelsArr[i] = {name:"level "+(i+1), points:i*10, perComp:Math.floor(100/(i+1))};

  num_levels = levelsArr.length;

  modulesMat = new Array(num_levels);
  for(var i=0; i<num_levels; i++)
    modulesMat[i] = new Array(i+1);

  for(var i=0; i<num_levels; i++) //inserire dati db
    for(var j=0; j<i+1; j++)
      modulesMat[i][j] = new Module("modulo"+i+""+j, i*j, i==j);

  for(level=0; level<num_levels && levelsArr[level].points <= userPoints; level++);
  level--;
}

function makeLevelColumn()
{
   var newHtml = "";
   for(var i=levelsArr.length-1;i>=0;i--)
   {
     newHtml += "<ul class='list-group list-group-padding'>";
     newHtml += "<li class='list-group-item ";

     if(levelsArr[i].points > userPoints)
      newHtml+="disabled'";
     else if(levelsArr[i].perComp==0)
      newHtml+="list-group-item-danger'";
     else if(levelsArr[i].perComp==100)
      newHtml+="list-group-item-success'"
     else
      newHtml+="list-group-item-warning'";

      if(levelsArr[i].points <= userPoints)
       newHtml+="onclick='changeMiddleColumn("+i+")'";
      newHtml+=">"+levelsArr[i].name;

      newHtml+="<span class='badge'>";
      if(levelsArr[i].points > userPoints)
       newHtml+="<span class='glyphicon glyphicon-lock'></span>";
      else
       newHtml+=levelsArr[i].perComp+"%";

      newHtml+="</span> </li> </ul>";
    }

    document.getElementById("levelColumn").innerHTML = newHtml;
}

function initProgressBar()
{
  var mod_bar_percentage = level+1 < levelsArr.length ? Math.floor(userPoints / levelsArr[level+1].points * 100) : 100;
  var points_to_next = level+1 < levelsArr.length ? levelsArr[level+1].points - userPoints : 0;
  document.getElementById("progressBarText").innerHTML = "Points until next level: "+points_to_next;
  document.getElementById("progressBarPerc").innerHTML = mod_bar_percentage+"%";
  document.getElementById("progressBarPerc").style.width = mod_bar_percentage+"%";
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
