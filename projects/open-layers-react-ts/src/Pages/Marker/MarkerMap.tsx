import "./ZoomInOut.css"

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { useEffect, useRef } from 'react';


function ZoomInOutMap() {
  const mapContainerRef = useRef(null)
  const map = useRef<Map>()


  useEffect(() => {
    if (!map.current) {
      const newMapInstance = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: mapContainerRef.current!,
        view: new View({
          center: [0, 0],
          zoom: 3,
        }),
      });

      map.current = newMapInstance

    } else {

    }
  }, [])

  return (
    <div ref={mapContainerRef} style={{ height: "80vh" }} />
  )
}

export default ZoomInOutMap