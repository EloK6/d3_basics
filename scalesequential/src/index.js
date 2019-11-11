import "./styles.css";
import { scaleLinear, scaleSequential, select, interpolateRainbow } from "d3";

var linearScale = scaleLinear()
  .domain([0, 100])
  .range([0, 600]);

var sequentialScale = scaleSequential()
  .domain([0, 100])
  .interpolator(interpolateRainbow);

var myData = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

select("#wrapper")
  .selectAll("circle")
  .data(myData)
  .enter()
  .append("circle")
  .attr("r", 10)
  .attr("cx", d => linearScale(d))
  .style("fill", d => sequentialScale(d));
