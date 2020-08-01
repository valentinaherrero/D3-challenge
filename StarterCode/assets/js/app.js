// @TODO: YOUR CODE HERE!

// create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
// create a scatter plot that represents each state with circle elements
// pull in the data from data.csv by using the d3.csv function

// Include state abbreviations in the circles.
// Create and situate your axes and labels to the left and bottom of the chart.

// structure of chart 
var width = parseInt(d3.select("#scatter").style("width")); // select scatter id from html
var height = width - width /4;
var margin = 20;
var labelArea = 110;
var tPadBot = 40;
var tPadLeft = 40;

// svg wrapper
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

var circRadius; // dot radius
function crGet() {
    if (width <= 530) {
        circRadius = 5; //if width less than 530, radius 5px, if more than, radius 10px
    }
    else {
        circRadius = 10;
    }
}
crGet(); // call function

svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");
    xText.attr(
        "transform",
        "translate(" +
         ((width - labelArea) / 2 + labelArea) +
            ", " +
            (height - margin - tPadBot) +
            ")"
    );

xText
.append("text")
.attr("y", -26)
.attr("data-name", "poverty")
.attr("data-axis", "x")
.attr("class", "aText active x")
.text("In Poverty (%)");

var leftTextX = margin + tPadLeft;
var LeftTextY = (height + labelArea) / 2 - labelArea;
svg.append("g").attr("class", "yText");
var yText = d3.select(".yText");

yText.attr(
    "transform",
    "translate(" +
    leftTextX + ", " + LeftTextY +
    ")rotate(-90)"
);

yText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Lacks Healthcare (%)");

  // import csv
  
  d3.csv("assets/data/data.csv").then(function(data) {
      visualize(data);
  });

  // visualize data function

  function visualize(theData) {
      var curX = "poverty";
      var curY = "healthcare";

      var xMin;
      var xMax;
      var yMin;
      var yMax;

      // get smallest and largest data from poverty and healthcare columns 
     function xMinMax() { 
      xMin = d3.min(theData, function(d) {
          return parseFloat(d[curX]) * 0.90;
      });

      xMax = d3.max(theData, function(d) {
        return parseFloat(d[curX]) * 1.10;
    });
}
     function yMinMax() {
      yMin = d3.min(theData, function(d) {
        return parseFloat(d[curY]) * 0.90;
    });

      yMax = d3.max(theData, function(d) {
        return parseFloat(d[curY]) * 1.10;
    });
}

  

  xMinMax();
  yMinMax();

  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labelArea, margin]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

svg 
  .append("g")
  .call(xAxis)
  .attr("class", "xAxis")
  .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
 svg 
  .append("g")
  .call(yAxis)
  .attr("class", "yAxis")
  .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

  var theCircles = svg.selectAll("g the Circles").data(theData).enter();
  theCircles
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d[curX]);
    })
    .attr("cy", function(d) {
        return yScale(d[curY]);
    })
    .attr("r", circRadius)
    .attr("class", function(d) {
        return "stateCircle" + d.abbr;
    })
  }
