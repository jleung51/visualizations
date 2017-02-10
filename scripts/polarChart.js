var canvasWidth = 1000;
var canvasHeight = 600;

var xCenter = canvasWidth/2;
var yCenter = canvasHeight/2;

var svg = d3.select("#polarChart").append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight);

/**
 * Draws a full polar chart for the D3 object svg given an array of values
 *
 * The greater the value, the greater the size of the arc
 * All arcs are evenly spaced and are drawn clockwise starting at North (0)
 *
 * @param {Array} array Array of values to be charted
 * @param {Number} x X-coordinate of the center point of the arc
 * @param {Number} y Y-coordinate of the center point of the arc
 * @param {String} color (Optional) Name of the color to draw the chart in; black if not specified
 *
 */
function drawPolarChart(array, x, y, color) {

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
   * @param {String} color Name of the color to draw the arc in
   *
   */
  function drawArc(arcSize, startAngle, endAngle, x, y, color) {
    var arc = d3.svg.arc()
        .innerRadius(0).outerRadius(arcSize)
        .startAngle(startAngle).endAngle(endAngle);

    var translateDirections = "translate(" + x.toString() + ", " + y.toString() + ")";
    svg.append("path")
        .attr("d", arc)
        .style("fill", color)
        .style("stroke", "white")
        .attr("transform", translateDirections);
  }

  if(color === null) {
    color = "black";
  }

  var angle = (Math.PI*2)/array.length;
  for(var i = 0; i < array.length; i++) {
    drawArc(array[i], i*angle, i*angle + angle, x, y, color);
  }
}

/**
 * Creates an array of specific length, with random numbers >= lower and < upper
 *
 * @param {Number} length Length of the final array
 * @param {Number} lower Minimum value of the random numbers
 * @param {Number} upper 1 greater than the maximum value of the random numbers
 *
 */
function arrayOfRandomNumbers(length, lower, upper) {
  var range = upper - lower;
  var array = [];
  for(var i = 0; i < length; i++) {
    var randVal = Math.random()*range + lower;
    array.push(randVal);
  }
  return array;
}

drawPolarChart(arrayOfRandomNumbers(5, 175, 225), xCenter, yCenter);
drawPolarChart(arrayOfRandomNumbers(5, 100, 150), xCenter, yCenter, "green");
drawPolarChart(arrayOfRandomNumbers(5, 25, 75), xCenter, yCenter, "blue");
