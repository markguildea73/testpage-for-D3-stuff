//margins 
var margin = {
top: 20,
bottom: 50,
right: 30,
left: 50
};

//size
var width = 700 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;


//date parse
var ParseDate = d3.time.format("%m/%d/%Y").parse;
//Create x and y scale to scale inputs
var xScale = d3.time.scale().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);

//Create x and y axes
var xAxis = d3.svg.axis().scale(xScale)
.orient("bottom")
.ticks(5);
var yAxis = d3.svg.axis().scale(yScale)
.orient("left")
.ticks(5);

//Create a line generator
var valueline = d3.svg.line()
.x(function(d){
return xScale(d.date);
})

.y(function(d){
return yScale(d.price);
});
//Create an SVG element and append it to the DOM
var svgElement = d3.select("body").append("svg")
.attr({"width": width+margin.left+margin.right, "height": height+margin.top+margin.bottom})
.append("g")
.attr("transform","translate("+margin.left+","+margin.top+")");
//Read TSV file
d3.csv("MOCK_DATA.csv", function(data){
//Parse Data into useable format
data.forEach(function(d){

d.date = ParseDate(d.date);
d.price = +d.price;
//the + sign converts string automagically to number
});
// sort the dates to make the trend more readable
data.sort(function(a,b){
  return new Date(b.date) - new Date(a.date);
});

//Set the domains of our scales
xScale.domain(d3.extent(data, function(d){ return d.date; }));
yScale.domain([0, d3.max(data, function(d){ return d.price; })]);

//append the svg path
var path = svgElement.append("path")
.attr("d", valueline(data));

//Add X Axis
var x = svgElement.append("g")
.attr("transform", "translate(0,"+height+")")
.call(xAxis);

//Add Y Axis
var y = svgElement.append("g")
.call(yAxis);

//Add label to y axis
y.append("text")
.attr("fill", "#000")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", "0.71em")
.attr("text-anchor", "end")
.text("Allocated (Euro)");
});


  