import "./styles.css";
import { select } from "d3";

console.log(document.body.clientWidth);
console.log(document.body.clientHeight);

const svg = select("svg");
const width = document.body.clientWidth;
const height = document.body.clientHeight;

svg
  .attr("width", width)
  .attr("height", height)
  .append("rect")
  .attr("width", width)
  .attr("height", height)
  .attr("rx", 40)
  .attr("fill", "pink");
