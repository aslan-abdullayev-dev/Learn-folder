import { useEffect, useRef, useState } from "react";

import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

const Change_basemap_layer = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    esriConfig.apiKey =
      "AAPKfdc991e23b394a4e8a7ca313a05c9326r3CNLP6J-mzPKT7RfhKYEPKeCZHgKMdo0X0tqTF7IZsrMf73zVc391uH12xaSwHj";

    const map = new Map({
      basemap: "arcgis-topographic", // Basemap layer service
    });

    const view = new MapView({
      container: mapRef.current,
      map: map,
      center: [-118.80543, 34.027],
      zoom: 13,
    });

    // change base-map on each click
    const basemapToggle = new BasemapToggle({
      view: view,
      nextBasemap: "arcgis-imagery",
    });
    view.ui.add(basemapToggle, "bottom-right");
    // end change base-map on each click

    // select base-map from gallery
    const basemapGallery = new BasemapGallery({
      view: view,
      source: {
        query: {
          title: '"World Basemaps for Developers" AND owner:esri',
        },
      },
    });
    view.ui.add(basemapGallery, "top-right"); // Add to the view
    // end select base-map from gallery

    // POLYLINE DATA ==========================================================
    // POLYLINE DATA ==========================================================
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const polyline = {
      type: "polyline",
      paths: [
        [-118.821527826096, 34.0139576938577], //Longitude, latitude
        [-118.814893761649, 34.0080602407843], //Longitude, latitude
        [-118.808878330345, 34.0016642996246], //Longitude, latitude
      ],
    };
    const simpleLineSymbol = {
      type: "simple-line",
      color: [226, 119, 40], // Orange
      width: 2,
    };

    const polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: simpleLineSymbol,
    });
    graphicsLayer.add(polylineGraphic);
    // END POLYLINE DATA ==========================================================
    // END POLYLINE DATA ==========================================================
  }, []);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }}></div>;
};

export default Change_basemap_layer;
