// Define the data as a two-dimensional array of numbers. If you had other
// data to associate with each number, replace each number with an object, e.g.,
// `{key: "value"}`.
var data = [
  [90, 10], //completate, da completare
  [70, 30], //completate, da completare
  [100, 0], //completate, da completare
  [10, 90], //completate, da completare
  [0, 100] //completate, da completare
];
// Define the margin, radius, and color scale. The color scale will be
// assigned by index, but if you define your data using objects, you could pass
// in a named field from the data object instead, such as `d.name`. Colors
// are assigned lazily, so if you want deterministic behavior, define a domain
// for the color scale.
var m = 10,
  r = 100,
  z = d3.scale.category20c();



// Insert an svg element (with margin) for each row in our dataset. A child g
// element translates the origin to the pie center.
var svg = d3.select("#DIV2").selectAll("svg")
  .data(data)
  .enter().append("svg")
  .attr("width", (r + m) * 2)
  .attr("height", (r + m) * 2)
  .append("g")
  .attr("transform", "translate(" + (r + m) + "," + (r + m) + ")");


 var coun=-1;
  svg.data(data).append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("font-size","30px")
        .text(function(d) { coun++; var per=(data[coun][0]*100)/(data[coun][0]+data[coun][1]); return ~~per+"%"; })

// The data for each svg element is a row of numbers (an array). We pass that to
// d3.layout.pie to compute the angles for each arc. These start and end angles
// are passed to d3.svg.arc to draw arcs! Note that the arc radius is specified
// on the arc, not the layout.
var colo=-1;
var coun1=-1;
svg.selectAll("path")
  .data(d3.layout.pie())
  .enter().append("path")
  .attr("d", d3.svg.arc()
    .innerRadius(r / 2)
    .outerRadius(r))
  .style("fill", function(d) {
        colo++; //coun1++;
        //if(coun1%2==0 && data[coun1][0]<data[coun1][1])colo=(colo%2)+1;
        return z(colo%2); });
