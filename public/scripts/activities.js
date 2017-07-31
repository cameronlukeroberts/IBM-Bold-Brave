function initActivities(lv, mod)
{

  var result;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "/api/levels/"+lvl+"/"+mod, false);
  xhttp.send();

  var newHtml = "";
  var activities = result;
  for(var i=0; i<activities.length; i++)
<<<<<<< HEAD
   activities[i] = {name: result[i].name, descr: result[i].desc, points: result[i].points, completed: 0};
=======
   activities[i] = {name:'activity'+i, descr:'description'+i, completed:(i%2==0), points: i*10+1};
>>>>>>> 28f1ef045040e8f8f2c5e727449ecb9c44f289a5
  for(var i=0; i<activities.length; i++)
  {
    newHtml += "<div class='panel panel-default collapse-container'>";
    newHtml += "<div class='panel-heading collapse-trigger'>"+activities[i].name;
    newHtml += "<span style='float: right'><i>"+activities[i].points+"Pt.</i></span></div>";
    newHtml += "<div class='panel-body box-collapsed collapsable'>"+activities[i].descr;
    newHtml += "<div> <input type='checkbox'";
    if(activities[i].completed) newHtml += "checked";
    newHtml += ">";
    newHtml += "<label for='subscribeNews'>Activity completed</label> </div>";
    newHtml += "</div> </div>";
  }
  document.getElementById("activitiesContainer").innerHTML = newHtml;

  document.getElementById("activities-module-title").innerHTML = modulesMat[lv][mod].name;
  document.getElementById("activities-module-description").innerHTML = "descrizione "+lv+" "+mod;

  document.getElementById("activities-module-video").src = "http://www.youtube.com/embed/_Xcmh1LQB9I"
}

//old activities html:
/*<div class="panel panel-default collapse-container">
  <div class="panel-heading collapse-trigger">
    ACTIVITY 1
  </div>
  <div class="panel-body box-collapsed collapsable">
     ABBASSO IL LATINO
     <form>
        <div>
          <input type="checkbox" value="newsletter">
          <label for="subscribeNews">Activity completed</label>
        </div>
        <div>
          <button type="submit">Confirm</button>
        </div>
      </form>
  </div>
</div>*/
