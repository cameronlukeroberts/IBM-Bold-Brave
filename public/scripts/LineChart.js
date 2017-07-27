
var svg = d3.select("#svg1"),
  margin = {top: 10, right: 30, bottom: 20, left: 30},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var parseTime = d3.timeParse("%d-%b-%y");
var x = d3.scaleTime()
  .rangeRound([0, width]);
var y = d3.scaleLinear()
  .rangeRound([height, 0]);
var line = d3.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.close); });
d3.tsv("/data.tsv", function(d) {
  d.date = parseTime(d.date);
  d.close = +d.close;
  return d;
}, function(error, data) {
  if (error) throw error;
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
  .attr("stroke-width", 3);
  g.append("g")
    .call(d3.axisLeft(y))
  .attr("stroke-width", 3)
  .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 3)
    .attr("dy", "1.71em")
    .attr("text-anchor", "end")
    .text("BRAVETY");
  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 6.5)
    .attr("d", line);
});
