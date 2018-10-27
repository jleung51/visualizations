/**
 * Javascript program which utilizes the D3 library to generate a bar chart
 * from data. Labels can be included.
 * The example below draws 3 bar charts from randomly generated data.
 *
 * @summary Javascript program which generates a bar chart from data.
 * @link https://jleung51.github.io/visualizations/
 *
 */

// TODO: From https://bost.ocks.org/mike/bar/3/

"use strict";

(function() {

  var data = [
    {
      name: "A",
      value: 10
    },
    {
      name: "B",
      value: 30
    },
    {
      name: "C",
      value: 20
    },
    {
      name: "D",
      value: 40
    },
    {
      name: "E",
      value: 50
    }
  ];

  var canvasWidth = 400;
  var canvasHeight = 400;

  var margin = {
    top: 20,
    bottom: 30,
    left: 30,
    right: 20
  };

  var graphWidth = canvasWidth - margin.left - margin.right;
  var graphHeight = canvasHeight - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .domain(data.map(function(d) { return d.name; }))
      .rangeRoundBands([0, graphWidth], .1);

  var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
      .range([graphHeight, 0]);

  var svg = d3.select(".barChart").append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10, "%");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + graphHeight + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

      //TODO: Not working
      // .append("text")
      // .attr("transform", "rotate(-90)")
      // .attr("y", 10)
      // .attr("dy", ".71em")
      // .style("text-anchor", "end")
      // .text("Y-Axis");

  var bars = svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return graphHeight - y(d.value); })
        .attr("width", x.rangeBand())
        .attr("fill", "steelblue");

  // bars.append("rect")
  //     .attr("y", function(d) { return y(d.value); })
  //     .attr("width", x.rangeBand())
  //     .attr("height", function(d) { return graphHeight - y(d.value); })
  //     .style("fill", "steelblue");
  //
  // svg.selectAll(".bar")
  //   .data(data)
  //   .enter().append("rect")
  //     .attr("class", "bar")
  //     .attr("x", function(d) { return x(d.name); })
  //     .attr("y", function(d) { return y(d.value); })
  //     .attr("height", function(d) { return height - y(d.value); })
  //     .attr("width", x.rangeBand());
  //

  //TODO: Not working
  svg.selectAll(".bar").append("text")
      .attr("x", x.rangeBand() / 2)
      .attr("y", function(d) { return y(d.value) + 10; })
      .attr("dy", ".75em")
      .attr("color", "black")
      .text(function(d) { return d.value; });

})();
