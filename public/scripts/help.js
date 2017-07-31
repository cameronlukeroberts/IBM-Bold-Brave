function initHelp(){
  var result;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "/api/faq", false);
  xhttp.send();

  var helpArray=new Array(result.length);
  for(var i=0;i<helpArray.length;i++)
    helpArray[i]={question:result[i].question,answer:result[i].answer}

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
