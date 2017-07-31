var percentageBravometer = bravometerData[bravometerData.length-1].score;

var g=new JustGage({
  id: "bravometer",
  value: percentageBravometer,
  min: 0,
  max: 100,
  title: "Your score"
});
