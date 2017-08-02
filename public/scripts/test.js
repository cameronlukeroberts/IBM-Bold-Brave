var questionMat, currentQuestion, questionMade;
var number_question = 10;

function randShuffle(data, l, r) //random shuffle di data [l, r)
{
  var len = 10;
  while(len < r - l + 1) len *= 10;
  var ite = 10;
  for(var i=0; i<ite; i++)
  {
    var a = Math.floor(Math.random() * len)%(r-l) + l;
    var b = Math.floor(Math.random() * len)%(r-l) + l;
    var c = data[a];
    data[a] = data[b];
    data[b] = c;
  }
}

function initTest()
{
  var result;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "/api/btq", false);
  xhttp.send();
  result.sort(function(a,b){return a.category==b.category?0:(a.category<b.category?-1:1)});
  questionMat = Array(number_question);
  var l=0, ind=[2,2,3,3];
  randShuffle(ind, 0, 4);
  for(var r=1;r<result.length;++r)
    if(result[l].category!=result[r].category){
      randShuffle(result, l, r);
      l=r;
    }
  randShuffle(result, l, result.length);
  for(var i=0,t=0;i<ind.length;i++)
    for(var j=0;j<ind[i];j++)
      questionMat[t++]={question:result[5*i+j].question,points:0,positive:result[5*i+j].positive, category:result[5*i+j].category};
  currentQuestion=0;
  questionMade=0;
  changeTest();
}

function prevQuestion(){
  if(currentQuestion>0){
    currentQuestion--;
    changeTest();
  }
}

function nextQuestion(){
  if(questionMat[currentQuestion].points>0){
    currentQuestion++;
    changeTest();
  }
}

function setAnswer(nAnswer){
  questionMat[currentQuestion].points=nAnswer;
  changeTest();
  if(questionMade==currentQuestion && questionMade!=number_question-1){
    questionMade++;
    nextQuestion();
  }
}

function changeTest()
{
  if(currentQuestion<number_question-1)
    document.getElementById("nextQuestionBtnCol").innerHTML = "<div onclick='nextQuestion()' class='centralize arrow-right' id='nextQuestionBtn'></div>";
  else if(currentQuestion==number_question-1)
    document.getElementById("nextQuestionBtnCol").innerHTML = "<div onclick='nextQuestion()' class='centralize test-ending-btn' id='nextQuestionBtn'></div>";
  else
    totalScore();
  document.getElementById("questionDescription").innerHTML = questionMat[currentQuestion].question;
  for(var i=1;i<=5;i++)
    document.getElementById("activityOption"+i).style.backgroundColor="#FFFFFF";
  document.getElementById("prevQuestionBtn").style.opacity=(currentQuestion==0?"0.4":"1");
  if(questionMat[currentQuestion].points>0){
    document.getElementById("nextQuestionBtn").style.opacity="1.0";
    document.getElementById("activityOption"+questionMat[currentQuestion].points).style.backgroundColor="#F3F3F6";
  }
  else{
    document.getElementById("nextQuestionBtn").setAttribute("onclick","");
    document.getElementById("nextQuestionBtn").style.opacity="0.4";
  }
  document.getElementById("category-container").innerHTML = questionMat[currentQuestion].category;
}

function totalScore(){
  var score=0;
  for(var i=0;i<number_question;i++)
    score+=(questionMat[i].positive ? questionMat[i].points : 6-questionMat[i].points);
  var max_score = 5 * number_question;
  score = Math.floor(score / max_score * 100);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 1) {
      document.location.href="/test_end";
    }
  };
  xhttp.open("GET", "/api/addscore/"+usr+"/"+score, true);
  xhttp.send();
}
