import { scaleOrdinal } from "d3";

const colorScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["green", "yellow"]);

const radiusScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([30, 15]);

const xPosition = (d, i) => i * 100 + 40;

export const fruitBowl = (selection, props) => {
  const { fruits, height, setSelectedFuit, selectedFruit } = props;
  const circles = selection.selectAll("circle").data(fruits, d => d.id);
  circles
    .enter()
    .append("circle")
    .attr("cx", xPosition)
    .attr("cy", height / 2)
    .attr("r", 0)
    .merge(circles)
    .attr("fill", d => colorScale(d.type))
    .attr("stroke-width", 5)
    .attr("stroke", d => (d.id === selectedFruit ? "black" : "none"))
    .on("mouseover", d => setSelectedFuit(d.id))
    .on("mouseout", d => setSelectedFuit(null))
    .transition()
    .duration(1000)
    .attr("cx", xPosition)
    .attr("r", d => radiusScale(d.type));
  circles
    .exit()
    .transition()
    .duration(1000)
    .attr("r", 0)
    .remove();
};
