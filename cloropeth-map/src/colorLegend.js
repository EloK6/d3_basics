export const colorLegend = (selection, props) => {
  const {
    colorScale,
    spacing,
    circleRadius,
    textOffset,
    backgroundRectWidth
  } = props;
  const backgroundRect = selection.selectAll("rect").data([null]);
  backgroundRect
    .enter()
    .append("rect")
    .merge(backgroundRect)
    .attr("x", -circleRadius * 2)
    .attr("y", -circleRadius * 2)
    .attr("rx", circleRadius)
    .attr("width", backgroundRectWidth)
    .attr("height", spacing * colorScale.domain().length + circleRadius * 2)
    .attr("fill", "white")
    .attr("opacity", 0.8);

  const groups = selection.selectAll("g").data(colorScale.domain());

  const groupsEnter = groups
    .enter()
    .append("g")
    .attr("class", "tick");

  groupsEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(0,${i * spacing})`);

  groups.exit().remove();

  groupsEnter
    .append("circle")
    .merge(groups.select("circle"))
    .attr("r", circleRadius)
    .attr("fill", colorScale);

  groupsEnter
    .append("text")
    .merge(groups.select("text"))
    .text(d => d)
    .attr("dy", "0.32em")
    .attr("x", textOffset);
};
