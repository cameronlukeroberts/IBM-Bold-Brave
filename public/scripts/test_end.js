function initTestEnd()
{
  document.getElementById("score-section").innerHTML = "Your last score: "+bravometerData[bravometerData.length-1].score;
  if(bravometerData[bravometerData.length-1].score<20){
    document.getElementById("score-section").innerHTML = "<h3><b>Your last score:  "+bravometerData[bravometerData.length-1].score+"</b></h3></br>You're unsure of your bravery. Maybe you haven't been given opportunities to be bold, or maybe you're convinced that you're simply not a brave person. Either way, look for opportunities to improve how you do things. Take a more positive stance on taking on new opportunities, and actively seek out challenges that will boost your confidence and make you increasingly bolder.";
  }
  else if(bravometerData[bravometerData.length-1].score<80){
    document.getElementById("score-section").innerHTML = "<h3><b>Your last score:  "+bravometerData[bravometerData.length-1].score+"</b></h3></br>Your bravery is a 'work in progress'. You've had some successes, so now it's time to let loose and stretch yourself. Share your ideas and perspectives with others, and ask them how they view problems. Although you may have had some opportunities to lead a team or change the norm in a corperate environment, you may have not given it your all because of the repercutions if it were to fail. Take that head strong attitude you already have and use it to it's fullest potential.";
  }
  else{
    document.getElementById("score-section").innerHTML = "<h3><b>Your last score:  "+bravometerData[bravometerData.length-1].score+"</b></h3></br>Bravery is one of your strengths, and innovative, bold and creative minds are highly sought after. So don't hide your ability! Look for ways to share your creativity process and outgoing, confident nature with others. Engage colleagues and teammates in their pursuits, and promote being 'Bold & Brave' in your team and organization.";
  }
}
