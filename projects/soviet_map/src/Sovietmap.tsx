import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from "react";
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import * as turf from '@turf/turf';

import russiaGeoJSON from "./geojson/russia.json"
// import sovietGeoJSON from "./geojson/soviet.json"
// import ottomansGeoJSON from "./geojson/ottomans.json"
// import indoChina from "./geojson/indo-china.json"
// import brasil from "./geojson/brasil.geo.json"
// import aze from "./geojson/aze.geo.json"
// import britishindia from "./geojson/britishindia2.geo.json"
import tzarRussia from "./geojson/tzarRussia.geo.json"

mapboxgl.accessToken =
  "pk.eyJ1Ijoic29uYXphZGEiLCJhIjoiY2xoZXF5ZWo4MHoydzNmbnZhb2dqeHJ6ayJ9.WhKSwA3ymHtsKZuJySMKvw";

const Sovietmap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [85, 20],
      zoom: 3,
      projection: 'globe'
    });
    // console.log(aze.features[0].geometry.coordinates)
    // turf.union(aze.features[0].geometry.coordinates)

    // Combine multiple borders into a single feature
    // const borderData = {
    //   type: 'FeatureCollection',
    //   features: [...russiaGeoJSON.features, ...aze.features], // Add more as needed
    // };

    // let unitedFeature: any = borderData.features[0];
    // for (let i = 1; i < borderData.features.length; i++) {
    //   const unitedFeature = turf.union(russiaGeoJSON.features, aze.features);
    // }


    // const unitedGeoJSON: FeatureCollection<Geometry, GeoJsonProperties> = {
    //   type: 'FeatureCollection',
    //   features: [unitedFeature],
    // };

    console.log(russiaGeoJSON)

    map.on('load', () => {
      map.addSource('sovietGeoJSON', {
        type: 'geojson',
        // data: turf.union(sovietGeoJSON),
        data: turf.union(tzarRussia),
      });

      map.addLayer({
        id: 'russia-borders',
        type: 'line',
        source: 'sovietGeoJSON',
        layout: {},
        paint: {
          'line-color': 'black',
          // "background-color": '#FF0000',
          // "fill-emissive-strength"
          'line-width': 2,
          "line-opacity": 0.8,
          // 'fill-color': '#F40000',
          // 'fill-opacity': 0.5,
        },
      });


      map.addLayer({
        id: 'russia-fill',
        type: 'fill',
        source: 'sovietGeoJSON',
        layout: {},
        paint: {
          'fill-color': '#FF0000',
          // "background-color": '#FF0000',
          // "fill-emissive-strength"
          // 'line-width': 2,
          // 'fill-color': '#F40000',
          'fill-opacity': 0.6,
        },
      });

    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '97vh' }}/>;
}

export default Sovietmap;