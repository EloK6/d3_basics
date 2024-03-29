import "./styles.css";
import { select, json, tsv, geoPath, geoNaturalEarth1, zoom, event } from "d3";
import { feature } from "topojson";

const svg = select("svg");

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

const g = svg.append("g");

g.append("path")
  .attr("class", "sphere")
  .attr("d", pathGenerator({ type: "Sphere" }));

svg.call(
  zoom().on("zoom", () => {
    g.attr("transform", event.transform);
  })
);

Promise.all([
  tsv("https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"),
  json("https://unpkg.com/world-atlas@1.1.4/world/50m.json")
]).then(([tsvData, topoJsonData]) => {
  const countryName = tsvData.reduce((acc, d) => {
    acc[d.iso_n3] = d.name;
    //console.log(acc);
    return acc;
  }, {});

  /*let countryName = {};
  tsvData.forEach(d => {
    countryName[d.iso_n3] = d.name;
  });*/

  const countries = feature(topoJsonData, topoJsonData.objects.countries);
  g.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", pathGenerator)
    .append("title")
    .text(d => countryName[d.id]);
});
