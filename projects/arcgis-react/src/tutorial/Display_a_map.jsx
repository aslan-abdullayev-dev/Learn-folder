import { useEffect, useRef, useState } from "react";

import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

const Display_a_map = ({ long }) => {
  const myRef = useRef(null);
  const [destroy, setDestroy] = useState(true);

  esriConfig.apiKey =
    "AAPKfdc991e23b394a4e8a7ca313a05c9326r3CNLP6J-mzPKT7RfhKYEPKeCZHgKMdo0X0tqTF7IZsrMf73zVc391uH12xaSwHj";

  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service
  });
  console.log(map)

  const handleDestroy = () => {
    console.log("handleDestroy", destroy);
    setDestroy(true);
  };

  useEffect(() => {
    const mapview = new MapView({
      map: map,
      center: [-118.805, 34.027], // Longitude, latitude
      zoom: 13, // Zoom level
      container: myRef.current, // Div element
    });
    // mapview.center = [long, 34.027];

    // console.log(mapview.destroy());

    // if (destroy) {
    //   //   console.log("handleDestroy useEffect", destroy);

    //   mapview.destroy();
    // }

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // POINT DATA ==========================================================
    // POINT DATA ==========================================================
    const point = {
      //Create a point
      type: "point",
      longitude: -118.80657463861,
      latitude: 34.0005930608889,
    };
    const simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40], // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1,
      },
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol,
    });
    graphicsLayer.add(pointGraphic);
    // END POINT DATA ==========================================================
    // END POINT DATA ==========================================================

    // POLYLINE DATA ==========================================================
    // POLYLINE DATA ==========================================================
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

    // POLYGON DATA ==========================================================
    // POLYGON DATA ==========================================================
    const polygon = {
      type: "polygon",
      rings: [
        [-118.818984489994, 34.0137559967283], //Longitude, latitude
        [-118.806796597377, 34.0215816298725], //Longitude, latitude
        [-118.791432890735, 34.0163883241613], //Longitude, latitude
        [-118.79596686535, 34.008564864635], //Longitude, latitude
        [-118.808558110679, 34.0035027131376], //Longitude, latitude
      ],
    };

    const simpleFillSymbol = {
      type: "simple-fill",
      color: [227, 139, 79, 0.1], // Orange, opacity 80%
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    };

    const popupTemplate = {
      title: "{Name}",
      content: "{Description}",
    };

    const attributes = {
      Name: "Graphic",
      Description: "I am a polygon",
    };

    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,

      attributes: attributes,
      popupTemplate: popupTemplate,
    });

    graphicsLayer.add(polygonGraphic);
    // END POLYGON DATA ==========================================================
    // END POLYGON DATA ==========================================================
  }, [destroy]);

  return (
    <>
      <div ref={myRef} style={{ height: "100vh", width: "100%" }}></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "100",
        }}
      >
        {/* <input type="button" onClick={handleDestroy} /> */}
      </div>
    </>
  );
};

export default Display_a_map;
