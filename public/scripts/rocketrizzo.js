var fps = 60;
var last;

var points, record, nrecord;
var label_points;
document.onkeydown = keyDown;
document.onkeyup = keyUp;
var canvas, context;
var cwidth, cheight;
var speed, velocity;
var rocketImg, rocket;
var asteroidImg;
var asteroids, next_asteroid;
var id;
var polig;

var leaderboard;
window.onload = function(){

  var result;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "/api/record", false);
  xhttp.send();
  record = result[0].score;
  nrecord = record;
  points = 0;
  label_points = document.getElementById('rocketpoints');
  canvas = document.getElementById('myCanvas');
  cwidth = canvas.width, cheight = canvas.height;
  //alert(cwidth+" "+cheight);
  context = canvas.getContext('2d');
  context.font = "30px Comic Sans MS";
  context.fillStyle = "#f9f50e";
  rocketImg = new Image();
  rocket = {x: cwidth/2-cwidth/20, y: cheight-cheight/6-20, w: cwidth/8.4, h: cheight/6};
  polig = new Array();

  polig.push({x: rocket.x+rocket.w/100*25, y: rocket.y+rocket.h/100*87});
  polig.push({x: rocket.x+rocket.w/100*34, y: rocket.y+rocket.h/100*58});
  polig.push({x: rocket.x+rocket.w/100*35, y: rocket.y+rocket.h/100*23});
  polig.push({x: rocket.x+rocket.w/100*50, y: rocket.y+rocket.h/100*0});
  polig.push({x: rocket.x+rocket.w/100*64, y: rocket.y+rocket.h/100*23});
  polig.push({x: rocket.x+rocket.w/100*66, y: rocket.y+rocket.h/100*58});
  polig.push({x: rocket.x+rocket.w/100*75, y: rocket.y+rocket.h/100*87});
  /*
  context.beginPath();
  context.moveTo(polig[0].x, polig[0].y);
  for(var i=1;i<polig.length;i++){
    console.log(polig[i].x+" "+polig[i].y);
    context.lineTo(polig[i].x, polig[i].y);
  }
  context.lineTo(polig[0].x, polig[0].y);
  context.stroke();
  */
  rocketImg.onload = function() {
    context.drawImage(this, rocket.x, rocket.y, rocket.w, rocket.h);
  };
  rocketImg.src = '/imgs/rocket.png';
  asteroidImg = new Image();
  asteroidImg.src = '/imgs/asteroid.png';
  speed = cwidth/200;
  velocity = 0;
  last = new Date().getTime();
  asteroids = new Array();
  next_asteroid = Math.random()*1000/2+500;
  id = setInterval(loopGame, 1 / fps * 1000);
}

function loopGame(){
  //update
  var delta = (new Date().getTime() - last)/(1000/fps);
  next_asteroid -= (new Date().getTime() - last);
  last = new Date().getTime();

  for(var i=0;i<polig.length;i++)
    polig[i].x-=rocket.x;
  rocket.x+=velocity*delta;

  if(rocket.x<0)
    rocket.x=0;
  if(rocket.x+rocket.w>canvas.width)
    rocket.x=canvas.width-rocket.w;

  for(var i=0;i<polig.length;i++)
    polig[i].x+=rocket.x;

  if(next_asteroid<0){
    var ast = {x: rand(0, cwidth), y: 0, speed: rand(speed/2, 2*speed), w: rand(cwidth/10, cwidth/4), h: 0, cx: 0, cy: 0, r: 0};
    ast.h = ast.w;
    ast.y = -ast.h;
    if(ast.x+ast.w > cwidth)
      ast.x = cwidth-ast.w;
    ast.r = ast.w/100*47;
    ast.cx = ast.x + ast.w/2;
    ast.cy = ast.y + ast.h/2;
    //console.log(ast);
    asteroids.push(ast);
    next_asteroid = Math.random()*1000/2+500;
    //console.log("asteroideeee");
  }
  var q = new Array();
  for(var i=0;i<asteroids.length;i++){
    asteroids[i].y+=speed;
    if(asteroids[i].y>cheight){
      q.push(i);
    }else{
      asteroids[i].cy+=speed;
    }
  }

  points += q.length;
  while(q.length>0){
    asteroids.splice(q[q.length-1], 1);
    q.pop();
  }

  for(var i=0; i<asteroids.length; i++){
    for(var j=0; j<polig.length-1;j++){
      if(collision(polig[j].x, polig[j].y, polig[j+1].x, polig[j+1].y, asteroids[i])){

        if(points>record)
          changePosition(points);

        document.getElementById('score').innerHTML = points;
        $('#trigg').trigger('click');

        if(points>record){
          var result;
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //result = JSON.parse(this.responseText);
            }
          };
          xhttp.open("GET", "/api/addrecord/"+points, false);
          xhttp.send();
        }
        clearInterval(id);
      }
    }
    if(collision(polig[0].x, polig[0].y, polig[polig.length-1].x, polig[polig.length-1].y, asteroids[i])){
      document.getElementById('score').innerHTML = points;
      
      if(points>record)
        changePosition(points);

      $('#trigg').trigger('click');

      if(points>record){
        var result;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //result = JSON.parse(this.responseText);
          }
        };
        xhttp.open("GET", "/api/addrecord/"+points, false);
        xhttp.send();
      }
      clearInterval(id);
    }
  }

  //redraw
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(rocketImg, rocket.x, rocket.y, rocket.w, rocket.h);
  for(var i=0;i<asteroids.length;i++){

      context.drawImage(asteroidImg, asteroids[i].x, asteroids[i].y, asteroids[i].w, asteroids[i].h);

      /*
      context.beginPath();
      context.arc(asteroids[i].cx, asteroids[i].cy, asteroids[i].r, 0, 2 * Math.PI, false);

      context.stroke();
      */
  }
  /*
  context.beginPath();
  context.moveTo(polig[0].x, polig[0].y);
  for(var i=1;i<polig.length;i++){
    //console.log(polig[i].x+" "+polig[i].y);
    context.lineTo(polig[i].x, polig[i].y);
  }
  context.lineTo(polig[0].x, polig[0].y);
  context.stroke();
  */
  context.fillText("Points: "+points , 30 , 50);
  if(points>nrecord)
    nrecord=points;
  context.fillText("Record: "+nrecord, 30, 90);

  //label_points.innerHTML = 'points: '+points;
}

function collision(x1, y1, x2, y2, asteroid){

  var cx=asteroid.cx, cy=asteroid.cy;
  var r=asteroid.r;

  if(cx<0 || cy<0)
    return false;
  var m=(y2-y1)/(x2-x1);
  var q=-x1*(y2-y1)/(x2-x1)+y1;

  var d=Math.abs(-m*cx+cy-q)/(Math.sqrt(m*m+1));
  //console.log(d);
  if(d>r) return false;

  var da = Math.sqrt(Math.abs((x1-cx)*(x1-cx))+Math.abs((y1-cy)*(y1-cy)));
  var db = Math.sqrt(Math.abs((x2-cx)*(x2-cx))+Math.abs((y2-cy)*(y2-cy)));
  /*
  console.log(da);
  console.log(db);
  */
  var k=cy+cx/m;

  var t=(k-q)/(m+1/m);
  if(t>=x1 && t<=x2 && (d<=da || d<=db))
    return true;

  return false;
  /*
  if(rocket.x >= asteroid.x && rocket.x <= asteroid.x + asteroid.w && asteroid.y + asteroid.h >= rocket.y) return true;
  if(rocket.x + rocket.w >= asteroid.x && rocket.x + rocket.w <= asteroid.x + asteroid.w && asteroid.y + asteroid.h >= rocket.y) return true;
  return false;
  */

}

function keyDown(e){
  if(e.keyCode == 'a' || e.keyCode == 37){
    velocity= -speed;
  }
  if(e.keyCode == 'd' || e.keyCode == 39){
    velocity= speed;
  }
}

function keyUp(e){
  //console.log(e.keyCode);
  if(e.keyCode == 'a' || e.keyCode == 37){
    if(velocity < 0)
      velocity = 0;
  }
  if(e.keyCode == 'd' || e.keyCode == 39){
    if(velocity > 0)
      velocity = 0;
  }
}

function rand(l, r){ //[l,r)
  var len = 10;
  while(len < r - l + 1) len *= 10;
  return Math.floor(Math.random() * len)%(r-l) + l;
}

function makeLeaderboard()
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      leaderboard = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "/api/leaderboard_rocket", false);
  xhttp.send();

  var newHtml="";
  for(var i=0; i<leaderboard.length; i++)
  {
    newHtml += '<li class="list-group-item leaderboard-entry">';
    newHtml += '<a href="#profile" class="">';
    newHtml += '<div class="leaderboard-image profile-image-container rounded-container img-circle">'
    newHtml += '<img class="" src="'+leaderboard[i].img+'" class="rounded" />'
    newHtml += '</div>';
    newHtml += '<div class="leaderboard-position">'+(i+1)+'</div><div class="leaderboard-inline-name">'+leaderboard[i].name+'</div>';
    newHtml += '<div class="leaderboard-inline-points">'+leaderboard[i].score+' Pt.</div>';
    newHtml += '</a>';
    newHtml += '</li>';
  }

  document.getElementById("leaderboard").innerHTML = newHtml;
  console.log(leaderboard);
}

function changePosition(p){
  console.log(leaderboard);
  for(var i=0;i<leaderboard.length;i++)
    if(leaderboard[i].username == usr)
      leaderboard[i].score = p;
  leaderboard.sort(function(a, b){
    return b.score-a.score;
  });

  var newHtml="";
  for(var i=0; i<leaderboard.length; i++)
  {
    newHtml += '<li class="list-group-item leaderboard-entry">';
    newHtml += '<a href="#profile" class="">';
    newHtml += '<div class="leaderboard-image profile-image-container rounded-container img-circle">'
    newHtml += '<img class="" src="'+leaderboard[i].img+'" class="rounded" />'
    newHtml += '</div>';
    newHtml += '<div class="leaderboard-position">'+(i+1)+'</div><div class="leaderboard-inline-name">'+leaderboard[i].name+'</div>';
    newHtml += '<div class="leaderboard-inline-points">'+leaderboard[i].score+' Pt.</div>';
    newHtml += '</a>';
    newHtml += '</li>';
  }

  document.getElementById("leaderboard").innerHTML = newHtml;

}
