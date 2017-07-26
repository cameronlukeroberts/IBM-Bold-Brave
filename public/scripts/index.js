window.onload = function() {
    setTimeout(myMoveRocket, 1000);
}

function myMoveRocket() {
  var elem = document.getElementById("rocket");
  var per = 80;
  var per_final = 20;
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
