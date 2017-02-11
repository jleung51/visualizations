/**
 * Javascript program which utilizes the D3 library to generate a polar chart
 * from data. Labels can be included.
 * The example below draws 3 polar charts from randomly generated data.
 *
 * @summary Javascript program which generates a polar chart from data.
 * @link https://jleung51.github.io/visualizations/
 *
 */

"use strict";

var canvasWidth = 500;
var canvasHeight = 500;

var xCenter = canvasWidth/2;
var yCenter = canvasHeight/2;

var svg = d3.select("#polarChart").append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight);

var values = [];

values = arrayOfRandomIntegers(randomInteger(3, 7), 175, 225);
drawPolarChart(svg, values, xCenter, yCenter, "black",
    arrayToStringArray(values), "black"
);

values = arrayOfRandomIntegers(randomInteger(3, 7), 100, 150);
drawPolarChart(svg, values, xCenter, yCenter, "darkblue",
    arrayToStringArray(values), "white"
);

values = arrayOfRandomIntegers(randomInteger(3, 7), 25, 75);
drawPolarChart(svg, values, xCenter, yCenter, "red",
    arrayToStringArray(values), "white"
);

/**
 * Creates a random integer >= lower and < upper
 *
 * @param {Number} lower Minimum value of the random number
 * @param {Number} upper 1 greater than the maximum value of the random number
 * @return {Number} number Random integer equal to or greater than "lower",
 * and less than "upper"
 *
 */
function randomInteger(lower, upper) {
  var range = upper - lower;
  var randNum = Math.random()*range + lower;
  return Math.round(randNum);
}

/**
 * Creates array of specific length with random integers >= lower and < upper
 *
 * @param {Number} length Length of the final array
 * @param {Number} lower Minimum value of the random numbers
 * @param {Number} upper 1 greater than the maximum value of the random numbers
 * @return {Array} array Array of length "length" with random integers equal
 * to or greater than "lower", and less than "upper"
 *
 */
function arrayOfRandomIntegers(length, lower, upper) {
  var array = [];
  for(var i = 0; i < length; i++) {
    array.push(randomInteger(lower, upper));
  }
  return array;
}

/**
 * Generates array with stringified values
 *
 * @param {Array} array Array of values
 * @return {Array} array Array of String values
 *
 */
function arrayToStringArray(array) {
  var arrayStrings = [];
  for(var i = 0; i < array.length; i++) {
    arrayStrings.push(array[i].toString())
  }
  return arrayStrings;
}

/**
 * Draws a full polar chart for a D3 object given an array of values
 *
 * The greater the value, the greater the size of the arc
 * All arcs are evenly spaced and are drawn clockwise starting at North (0)
 *
 * @param {Object} d3Object D3 object in which the chart will be drawn
 * @param {Array} array Array of values to be charted
 * @param {Number} x X-coordinate of the center point of the arc
 * @param {Number} y Y-coordinate of the center point of the arc
 * @param {String} color (Optional) Name of the color to draw the chart in;
 * black if not specified
 * @param {Array} textArray (Optional) Array of Strings to be placed on the
 * outside of the arcs
 * @param {String} textColor (Optional) Name of the color to draw the text in;
 * black if not specified
 *
 */
function drawPolarChart(d3Object, array, x, y, color, textArray, textColor) {

  /**
   * Draws an optionally labeled pie sector for a D3 object
   *
   * Angles begin at North (0), move clockwise, and are measured in radians
   *
   * @param {Object} d3Object D3 object in which the chart will be drawn
   * @param {Number} arcSize Radius of the arc
   * @param {Number} startAngle Beginning angle of the arc
   * @param {Number} endAngle Ending angle of the arc
   * @param {Number} x X-coordinate of the center point of the arc
   * @param {Number} y Y-coordinate of the center point of the arc
   * @param {String} arcColor (Optional) Name of the color to draw the arc in;
   * black if not specified
   * @param {String} text (Optional) Text to place on the outside of the arc
   * @param {String} textColor (Optional) Name of the color to draw the text in;
   * black if not specified
   *
   */
  function drawArc(d3Object, arcSize, startAngle, endAngle, x, y, arcColor,
      text, textColor) {

    if(color === null) {
      color = "black";
    }
    if(textColor === null) {
      textColor = "black";
    }

    var elementId = "arc_" + Math.random().toString();

    // Draw the arc
    var arc = d3.svg.arc()
        .innerRadius(0).outerRadius(arcSize)
        .startAngle(startAngle).endAngle(endAngle);
    var translateDirections = "translate(" + x.toString() + ", " +
        y.toString() + ")";

    d3Object.append("path")
        .attr("id", elementId)
        .attr("d", arc)
        .style("fill", color)
        .style("stroke", "white")
        .attr("transform", translateDirections);

    // Draw the text
    if(text !== undefined || text !== null) {
      d3Object.append("text").append("textPath")
          .attr("xlink:href", "#"+elementId)
          .attr("startOffset", "18%")
          .style("text-anchor", "middle")
          .style("stroke", textColor)
          .text(text);
    }
  }

  if(textArray === undefined) {
    var textArray = [];
  }
  for(var i = textArray.length; i < array.length; i++) {
    textArray.push(null);
  }

  var angle = (Math.PI*2)/array.length;

  for(var i = 0; i < array.length; i++) {
    drawArc(
      d3Object, array[i], i*angle, i*angle + angle,
      x, y, color,
      textArray[i], textColor
    );
  }
}
