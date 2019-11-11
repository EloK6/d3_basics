import {
  select,
  csv,
  scaleTime,
  extent,
  axisLeft,
  axisBottom,
  scaleLinear,
  area,
  curveBasis,
  max,
  format
} from "d3";

const svg = select("svg");

const width = +svg.attr("width");
const height = +svg.attr("height");

const render = data => {
  const title = "World Population";

  const xValue = d => d.year;
  const xAxisLabel = "Year";

  const yValue = d => d.population;
  const yAxisLabel = "Population";

  const margin = { top: 60, right: 40, bottom: 88, left: 150 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const areaGenerator = area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight)
    .y1(d => yScale(yValue(d)))
    .curve(curveBasis);

  g.append("path")
    .attr("class", "line-path")
    .attr("d", areaGenerator(data));

  const xAxis = axisBottom(xScale)
    .ticks(5)
    .tickSize(-innerHeight)
    .tickPadding(15);

  const yAxisTickFormat = number => format(".1s")(number).replace("G", "B");

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)
    .tickFormat(yAxisTickFormat);

  const yAxisG = g.append("g").call(yAxis);
  yAxisG.selectAll(".domain").remove();

  yAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("y", -93)
    .attr("x", -innerHeight / 2)
    .attr("fill", "black")
    .attr("transform", `rotate(-90)`)
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0,${innerHeight})`);

  xAxisG.select(".domain").remove();

  xAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("y", 75)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .text(xAxisLabel);

  svg
    .append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", 40)
    .text(title);
};

csv("data.csv").then(data => {
  data.forEach(d => {
    d.year = new Date(d.year);
    d.population = +d.population;
  });
  render(data);
});
