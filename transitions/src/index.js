import "./styles.css";
import { rgb, select } from "d3";

var data = [];
var numCircles = 20,
  width = 620,
  height = 350,
  maxRadius = 50;

function rnd(x) {
  return Math.floor(Math.random() * x);
}

function randomise() {
  data = [];
  numCircles = 10;
  for (var i = 0; i < numCircles; i++) {
    data.push({
      x: rnd(width) + 70,
      y: rnd(height) + 70,
      r: rnd(maxRadius) + 20,
      fill: rgb(rnd(250), rnd(250), rnd(250))
    });
  }
}

function update() {
  randomise();

  var circles = select("svg")
    .selectAll("circle")
    .data(data);

  // Enter
  circles
    .enter()
    .append("circle")
    .attr("r", 0)
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .style("fill", "white")
    .merge(circles)
    .transition()
    .duration(1500)
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .attr("r", function(d) {
      return d.r;
    })
    .style("fill", function(d) {
      return d.fill;
    });

  // Exit
  circles
    .exit()
    .transition()
    .duration(1500)
    .attr("r", 0)
    .style("opacity", 0)
    .each("end", function() {
      select(this).remove();
    });
}
update();
document.getElementById("start-transition").onclick = function() {
  update();
};
