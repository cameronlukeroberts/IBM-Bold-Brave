function areYouSure(lv,mod,act,ans=-1){
  var newHtml="";
  if(ans==-1){
    newHtml+="<div class='row' align='center'>Are you sure, Bro?</div>";
    newHtml+="<div class='row'><div class='col-sm-1'></div>";
    newHtml+="<div class='col-sm-4'><button type='button' onclick='areYouSure("+lv+","+mod+","+act+",1)' class='test-btn text-center btn-no-padding' id='activityOption1'>Yes</button></div>";
    newHtml+="<div class='col-sm-2'></div>";
    newHtml+="<div class='col-sm-4'><button type='button' onclick='areYouSure("+lv+","+mod+","+act+",0)' class='test-btn text-center btn-no-padding' id='activityOption1'>No</button></div>";
    newHtml+="<div class='col-sm-1'></div></div>";
  }
  else if(ans==0){
    newHtml +="<input type='checkbox' onclick='areYouSure("+lv+","+mod+","+act+")'>";
    newHtml += "<label for='subscribeNews'>Activity completed</label> </div>";
  }
  else{
    userPoints += activityCube[lv][mod][act].points;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/addactivity/"+usr+"/"+lv+"/"+mod+"/"+act+"/"+userPoints, true);
    xhttp.send();

    document.getElementById("navbar-points").innerHTML = userPoints+" Pt.";

    newHtml +="<input type='checkbox' disabled='disabled' onclick='areYouSure("+lv+","+mod+","+act+")' checked>";
    newHtml += "<label for='subscribeNews'>Activity completed</label> </div>";
  }
  document.getElementById('completedCheck'+act).innerHTML = newHtml;
}

function initActivities(lv, mod)
{
  if(lv > level || mod >= modulesMat[lv].length)
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
        newHtml += "<div id='completedCheck"+i+"'> <input type='checkbox' onclick='areYouSure("+lv+","+mod+","+i+")' ";
        if(activityCube[lv][mod][i].completed) newHtml += "disabled='disabled' checked";
        newHtml += ">";
        newHtml += "<label for='subscribeNews'>Activity completed</label> </div>";
        newHtml += "</div> </div>";
      }
      document.getElementById("activitiesContainer").innerHTML = newHtml;

      document.getElementById("activities-module-title").innerHTML = modulesMat[lv][mod].name;
      document.getElementById("activities-module-description").innerHTML = "We give ourselves permission to step outside our comfort zones. We focus on delivering ideas that ignite our business and enrich ourselves as people. We champion thinking differently. We succeed by daring to do the things we were once afraid to do. We celebrate succeeding and failing in equal measure. We learn from every situation. We share our ideas and resources. Together we inspire others to become Bold and Brave.";

      document.getElementById("activities-module-video").src = "http://www.youtube.com/embed/qraTzkg-uF0";
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
