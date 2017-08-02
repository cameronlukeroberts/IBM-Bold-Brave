var fps = 60;
var last;

document.onkeydown = keyDown;
document.onkeyup = keyUp;
var canvas, context;
var speed, velocity;
var rocketImg, rocket;
window.onload = function(){
  canvas = document.getElementById('myCanvas');
  var cwidth = canvas.width, cheight = canvas.height;
  //alert(cwidth+" "+cheight);
  context = canvas.getContext('2d');
  rocketImg = new Image();
  rocket = {x: cwidth/2-cwidth/20, y: cheight-cheight/6-20, w: cwidth/10, h: cheight/6}
  rocketImg.onload = function() {
    context.drawImage(this, rocket.x, rocket.y, rocket.w, rocket.h);
  };
  rocketImg.src = '/imgs/rocket.png';
  speed = cwidth/200;
  velocity = 0;
  last = new Date().getTime();
  setInterval(loopGame, 1 / fps * 1000);
}

function loopGame(){
  var delta = (new Date().getTime() - last)/(1000/fps);
  last = new Date().getTime();

  rocket.x+=velocity*delta;
  if(rocket.x<0)
    rocket.x=0;
  if(rocket.x+rocket.w>canvas.width)
    rocket.x=canvas.width-rocket.w
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(rocketImg, rocket.x, rocket.y, rocket.w, rocket.h);
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
