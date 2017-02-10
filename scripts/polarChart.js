      var width = 1000;
      var height = 600;

      var xCenter = 600;
      var yCenter = 300;

      var svg = d3.select("#polarChart").append("svg")
          .attr("width", width)
          .attr("height", height);

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

          var translate_directions = "translate(" + x.toString() + ", " + y.toString() + ")";
          svg.append("path")
              .attr("d", arc)
              .style("fill", color)
              .style("stroke", "white")
              .attr("transform", translate_directions);
        }

        if(color === null) {
          color = "black";
        }

        var angle = (Math.PI*2)/array.length;
        var currentAngle = 0;

        for(var i = 0; i < array.length; i++) {
          drawArc(array[i], currentAngle, currentAngle+angle, x, y, color);
          currentAngle += angle;
        }
      }

      drawPolarChart([240, 180, 140, 220, 200], xCenter, yCenter);
      drawPolarChart([100, 50, 120, 50, 130], xCenter, yCenter, "green");
      drawPolarChart([60, 20, 100, 40, 60], xCenter, yCenter, "steelblue");
2
