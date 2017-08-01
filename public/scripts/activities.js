function initActivities(lv, mod)
{
  if(lv > level)
  {
    var msg = "<div class='activity-locked-message'>Error! You haven't unlocked this module yet!</div>";
    document.getElementById("activity-main-container").innerHTML = msg;
  }
  else
  {
      var newHtml = "";

      for(var i=0; i<activityCube[lv][mod].length; i++)
      {
        newHtml += "<div class='panel panel-default collapse-container'>";
        newHtml += "<div class='panel-heading collapse-trigger'>"+activityCube[lv][mod][i].name;
        newHtml += "<span style='float: right'><i>"+activityCube[lv][mod][i].points+"Pt.</i></span></div>";
        newHtml += "<div class='panel-body box-collapsed collapsable'>"+activityCube[lv][mod][i].descr;
        newHtml += "<div> <input type='checkbox'";
        if(activityCube[lv][mod][i].completed) newHtml += "checked";
        newHtml += ">";
        newHtml += "<label for='subscribeNews'>Activity completed</label> </div>";
        newHtml += "</div> </div>";
      }
      document.getElementById("activitiesContainer").innerHTML = newHtml;

      document.getElementById("activities-module-title").innerHTML = modulesMat[lv][mod].name;
      document.getElementById("activities-module-description").innerHTML = "descrizione "+lv+" "+mod;

      document.getElementById("activities-module-video").src = "http://www.youtube.com/embed/_Xcmh1LQB9I";
  }
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
