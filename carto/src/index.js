import "./styles.css";
import { select, json, geoPath, geoNaturalEarth1 } from "d3";
import { feature } from "topojson";

const svg = select("svg");

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

svg
  .append("path")
  .attr("class", "sphere")
  .attr("d", pathGenerator({ type: "Sphere" }));

json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(
  data => {
    const countries = feature(data, data.objects.countries);

    svg
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      //.attr("d", d => pathGenerator(d))
      .attr("d", pathGenerator)
      .append("title")
      .attr("classed", "country_name")
      .text(d => d.properties.name);
  }
);
//https://unpkg.com/world-atlas@1.1.4/world/110m.json
