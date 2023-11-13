import { useEffect, useRef } from "react";

import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";

const Custom_basemap_style = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    esriConfig.apiKey =
      "AAPKfdc991e23b394a4e8a7ca313a05c9326r3CNLP6J-mzPKT7RfhKYEPKeCZHgKMdo0X0tqTF7IZsrMf73zVc391uH12xaSwHj";

    const vectorTileLayer = new VectorTileLayer({
      portalItem: {
        id: "6976148c11bd497d8624206f9ee03e30", // Forest and Parks Canvas
      },
      opacity: 0.75,
    });
    const imageTileLayer = new TileLayer({
      portalItem: {
        id: "1b243539f4514b6ba35e7d995890db1d", // World Hillshade
      },
      opacity: 0.1,
    });
    const basemap = new Basemap({
      baseLayers: [imageTileLayer, vectorTileLayer],
    });
    const map = new Map({
      basemap: basemap, // Basemap layer service
    });
    const view = new MapView({
      container: mapRef.current,
      map: map,
      center: [-100, 40],
      zoom: 3,
    });
  }, []);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }}></div>;
};

export default Custom_basemap_style;
