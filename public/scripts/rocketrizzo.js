var fps = 60;
var last;

document.onkeydown = keyDown;
document.onkeyup = keyUp;
var canvas, context;
var cwidth, cheight;
var speed, velocity;
var rocketImg, rocket;
var asteroidImg;
var asteroids, next_asteroid;
window.onload = function(){
  canvas = document.getElementById('myCanvas');
  cwidth = canvas.width, cheight = canvas.height;
  //alert(cwidth+" "+cheight);
  context = canvas.getContext('2d');
  rocketImg = new Image();
  rocket = {x: cwidth/2-cwidth/20, y: cheight-cheight/6-20, w: cwidth/10, h: cheight/6}
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
  setInterval(loopGame, 1 / fps * 1000);
}

function loopGame(){
  //update
  var delta = (new Date().getTime() - last)/(1000/fps);
  next_asteroid -= (new Date().getTime() - last);
  last = new Date().getTime();

  rocket.x+=velocity*delta;
  if(rocket.x<0)
    rocket.x=0;
  if(rocket.x+rocket.w>canvas.width)
    rocket.x=canvas.width-rocket.w;

  if(next_asteroid<0){
    var ast = {x: rand(0, cwidth), y: 0, speed: rand(speed/2, 2*speed), w: rand(cwidth/10, cwidth/4), h: 0};
    ast.h = ast.w;
    ast.y = -ast.h;
    if(ast.x+ast.w > cwidth)
      ast.x = cwidth-ast.w;
    asteroids.push(ast);
    next_asteroid = Math.random()*1000/2+500;
    //console.log("asteroideeee");
  }
  var q = new Array();
  for(var i=0;i<asteroids.length;i++){
    asteroids[i].y+=speed;
    if(asteroids[i].y>cheight){
      q.push(i);
    }
  }

  while(q.length>0){
    asteroids.splice(q[q.length-1], 1);
    q.pop();
  }


  //redraw
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(rocketImg, rocket.x, rocket.y, rocket.w, rocket.h);
  for(var i=0;i<asteroids.length;i++)
    context.drawImage(asteroidImg, asteroids[i].x, asteroids[i].y, asteroids[i].w, asteroids[i].h);

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
  console.log(e.keyCode);
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
