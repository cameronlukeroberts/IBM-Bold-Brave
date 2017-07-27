var levelsArr;
var userPoints;
var userName;
var level, num_levels;
var modulesMat;

function init()
{
  userName = "Big Lenny";

  levelsArr = new Array(5);
  for(var i=0; i<levelsArr.length; i++) //prendere dati db
   levelsArr[i] = {name:"level "+(i+1), points:i*10, perComp:0};

  num_levels = levelsArr.length;

  modulesMat = new Array(num_levels);
  for(var i=0; i<num_levels; i++)
    modulesMat[i] = new Array(i+1);

  userPoints=0;
  for(var i=0; i<num_levels; i++) //inserire dati db
    for(var j=0; j<i+1; j++)
    {
      modulesMat[i][j] = {name:"modulo"+i+""+j, points:Math.floor(i*j), completed:i==j};
      if(modulesMat[i][j].completed)
        userPoints+=modulesMat[i][j].points;
    }

  for(level=0; level<num_levels && levelsArr[level].points <= userPoints; level++);
  level--;

  for(var i=0; i<num_levels; i++) //compute levels' percentages
  {
    var nc = 0;
    for(var j=0; j<modulesMat[i].length; j++)
     if(modulesMat[i][j].completed)
      nc++;
    levelsArr[i].perComp = Math.floor(nc / modulesMat[i].length * 100);
  }
}
