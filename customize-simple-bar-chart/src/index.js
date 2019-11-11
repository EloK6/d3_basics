import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format
} from "d3";

const svg = select("svg");

const width = +svg.attr("width");
const height = +svg.attr("height");

const render = data => {
  const xValue = d => d.population;
  const yValue = d => d.country;
  const margin = { top: 50, right: 30, bottom: 75, left: 200 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.bottom - margin.top;

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

  const xAxisTickFormat = number => format(".3s")(number).replace("G", "B");

  const yAxis = axisLeft(yScale);
  const xAxis = axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .call(yAxis)
    .selectAll(".domain, .tick line")
    .remove();

  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0,${innerHeight})`);
  xAxisG.select(".domain").remove();

  xAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("y", 60)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .text("Population");

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", d => yScale(yValue(d)))
    .attr("width", d => xScale(xValue(d)))
    .attr("height", yScale.bandwidth());

  g.append("text")
    .attr("class", "title")
    .attr("y", -10)
    .text("Top ten most Populous Countries");
};

csv("data.csv").then(data => {
  data.forEach(d => {
    d.population = +d.population * 1000;
  });
  render(data);
});
