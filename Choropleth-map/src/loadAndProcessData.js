import { feature } from "topojson";
import { json, tsv } from "d3";

export const loadAndProcessData = () =>
  Promise.all([
    tsv("https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"),
    json("https://unpkg.com/world-atlas@1.1.4/world/50m.json")
  ]).then(([tsvData, topoJsonData]) => {
    const rowById = tsvData.reduce((acc, d) => {
      acc[d.iso_n3] = d;
      return acc;
    }, {});

    const countries = feature(topoJsonData, topoJsonData.objects.countries);
    countries.features.forEach(d => {
      Object.assign(d.properties, rowById[d.id]);
    });

    return countries;
  });
