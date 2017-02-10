var canvasWidth = 500;
var canvasHeight = 500;

var xCenter = canvasWidth/2;
var yCenter = canvasHeight/2;

var svg = d3.select("#polarChart").append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight);

var values = [];

values = arrayOfRandomIntegers(5, 175, 225);
drawPolarChart(values, xCenter, yCenter, "black",
    arrayToStringArray(values), "black"
);

values = arrayOfRandomIntegers(5, 100, 150);
drawPolarChart(values, xCenter, yCenter, "green",
    arrayToStringArray(values), "white"
);

values = arrayOfRandomIntegers(5, 25, 75);
drawPolarChart(values, xCenter, yCenter, "blue",
    arrayToStringArray(values), "white"
);

/**
 * Draws a full polar chart for the D3 object svg given an array of values
 *
 * The greater the value, the greater the size of the arc
 * All arcs are evenly spaced and are drawn clockwise starting at North (0)
 *
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
function drawPolarChart(array, x, y, color, textArray, textColor) {

  /**
   * Draws an arc for the D3 object svg
   *
   * Angles begin at North (0), move clockwise, and are measured in radians
   *
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
  function drawArc(arcSize, startAngle, endAngle, x, y, arcColor,
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
    var translateDirections = "translate(" + x.toString() + ", " + y.toString() + ")";

    svg.append("path")
        .attr("id", elementId)
        .attr("d", arc)
        .style("fill", color)
        .style("stroke", "white")
        .attr("transform", translateDirections);

    // Draw the text
    if(text !== undefined || text !== null) {
      svg.append("text").append("textPath")
          .attr("xlink:href", "#"+elementId)
          .attr("startOffset", "18%")
          // .attr("dx", 20)
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
      array[i], i*angle, i*angle + angle,
      x, y, color,
      textArray[i], textColor
    );
  }
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
  var range = upper - lower;
  var array = [];
  for(var i = 0; i < length; i++) {
    var randVal = Math.random()*range + lower;
    array.push(Math.round(randVal));
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
