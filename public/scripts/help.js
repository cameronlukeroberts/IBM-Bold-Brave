function initHelp(){

  var helpArray=new Array(5);
  for(var i=0;i<helpArray.length;i++)
    helpArray[i]={question:"Question"+i,answer:"Answer"+i}

  var newHtml="";
  for(var i=0;i<helpArray.length;i++){
    newHtml+="<div class='panel panel-default collapse-container'>";
    newHtml+="<div class='panel-heading collapse-trigger'>";
    newHtml+=helpArray[i].question;
    newHtml+="</div>";
    newHtml+="<div class='panel-body box-collapsed collapsable'>"
    newHtml+=helpArray[i].answer;
    newHtml+="</div>";
    newHtml+="</div>"
  }
  document.getElementById("helpContainer").innerHTML=newHtml;
}
