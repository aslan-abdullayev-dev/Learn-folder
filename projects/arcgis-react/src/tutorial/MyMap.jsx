import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import esriConfig from "@arcgis/core/config";

import Polygon from "@arcgis/core/geometry/Polygon";
import { useEffect, useLayoutEffect, useRef } from "react"

const MyMap = () => {

    const mapRef = useRef(null)
    esriConfig.apiKey =
      "AAPKfdc991e23b394a4e8a7ca313a05c9326r3CNLP6J-mzPKT7RfhKYEPKeCZHgKMdo0X0tqTF7IZsrMf73zVc391uH12xaSwHj";
  

    useLayoutEffect(() => {
        new MapView({
            container: mapRef.current,
            map: new Map({
                // basemap: "dark-gray"
                // basemap: "topo-vector"
                basemap: "arcgis-topographic"

            }),
            zoom: 3
        })

        // const rings = [
        //     [  // first ring
        //         [-90.06138, 32.837, 35.1, 4.8],
        //         [-107.06133, 32.836, 35.2, 4.1],
        //         [-57.06124, 32.834, 35.3, 4.2],
        //         [-27.06138, 32.837, 35.1, 4.8]  // same as first vertex
        //     ], [  // second ring
        //         [-97.06326, 32.759, 35.4],
        //         [-97.06298, 32.755, 35.5],
        //         [-97.06153, 32.749, 35.6],
        //         [-97.06326, 32.759, 35.4]  // same as first vertex
        //     ]
        // ];

        // new Polygon({
        //     hasZ: true,
        //     hasM: true,
        //     rings: rings,
        //     spatialReference: { wkid: 4326 }
        // });
        // return null
    }, [])


    return <div ref={mapRef} style={{ height: "100vh", width: "100%" }}></div>
}

export default MyMap