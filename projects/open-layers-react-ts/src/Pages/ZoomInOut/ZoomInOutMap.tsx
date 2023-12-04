import "./ZoomInOut.css"

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { useEffect, useRef } from 'react';


function ZoomInOutMap({ zoom, setZoom }: any) {
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
          zoom,
        }),
      });

      map.current = newMapInstance
      //? return () => mapObject.setTarget(undefined);
    } else {
      //! map.current.getView().on("change:resolution", handleZoomInsideMap)
      map.current.on('moveend', handleZoomInsideMap);
    }
  }, [])

  useEffect(() => {
    if (map.current) {
      map.current.getView().setZoom(zoom)
    }
  }, [zoom])

  function handleZoomInsideMap() {
    //! const newZoomLevel = e.target.getZoom();
    const newZoomLevel = map.current!.getView().getZoom();
    if (newZoomLevel !== zoom) {
      setZoom(newZoomLevel);
    }
  }

  return (
    <div ref={mapContainerRef} style={{ height: "80vh" }} />
  )
}

export default ZoomInOutMap