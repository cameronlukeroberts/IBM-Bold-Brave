var activityMat, currentQuestion;
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
  activityMat = Array(number_question);
  for(var i=0;i<number_question;i++)
    activityMat[i] = {description:"Descrizione della domanda numero "+(i+1), points: 0, positive:i%2==0};
  currentQuestion = 0;
  changeTest(0);
}

function prevQuestion(){
  if(currentQuestion>0){
    currentQuestion--;
    changeTest();
  }
}

function nextQuestion(){
  if(activityMat[currentQuestion].points>0){
    if(currentQuestion<number_question-1){
      currentQuestion++;
      changeTest();
    }
    else
      totalScore();
  }
}

function setAnswer(nAnswer){
  activityMat[currentQuestion].points=nAnswer;
  changeTest();
}

function changeTest()
{
  document.getElementById("questionDescription").innerHTML = activityMat[currentQuestion].description;
  for(var i=1;i<=5;i++)
    document.getElementById("activityOption"+i).style.backgroundColor="#FFFFFF";
  if(activityMat[currentQuestion].points>0)
    document.getElementById("activityOption"+activityMat[currentQuestion].points).style.backgroundColor="#F3F3F6";
}

function totalScore(){
  var score=0;
  for(var i=0;i<number_question;i++)
    score+=(activityMat[i].positive || activityMat[0].points==0?activityMat[i].points:6-activityMat[i].points);
  alert(score);
}
