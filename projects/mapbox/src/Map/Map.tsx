import "./Map.css"

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken =
  "pk.eyJ1Ijoic29uYXphZGEiLCJhIjoiY2xoZXF5ZWo4MHoydzNmbnZhb2dqeHJ6ayJ9.WhKSwA3ymHtsKZuJySMKvw";


function Map({
  lngState,//? iki yonlu, referance teleb edir, evt var
  setLngState,
  latState,//? iki yonlu, referance teleb edir, evt var
  setLatState,
  zoomState, //? iki yonlu, evt var
  setZoomState,
  styleState, //? tek yonlu yuxarida set edilir
  pitchState, //? iki yonlu, evt var
  setPitchState,
  bearingState, //? iki yonlu, evt var
  setBearingState,
  attrState //? tek yonlu yuxarida set edilir
}: any) {
  const container = useRef(null);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [marker, setMarker] = useState<mapboxgl.Marker>();
  const [attribution, setAttribution] = useState<mapboxgl.AttributionControl>();

  useEffect(() => {
    const initializedMap = new mapboxgl.Map({
      container: container.current!,
      style: styleState,
      center: [lngState, latState],
      zoom: zoomState,
      pitch: pitchState, //? min 0 max 85
      bearing: bearingState //? min -180 max 180
    });

    setMarker(new mapboxgl.Marker()
      .setLngLat([lngState, latState])
      .addTo(initializedMap)
    )

    initializedMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    const initializedAttr = new mapboxgl.AttributionControl({
      compact: true,
      customAttribution: attrState,
    });
    initializedMap.addControl(initializedAttr);
    setAttribution(initializedAttr)

    setMap(initializedMap)
    // !======================
    return () => initializedMap.remove();
  }, [])

  useEffect(() => {
    if (map) {
      map.on('click', (e) => {
        if (marker) {
          marker.setLngLat(e.lngLat);
          setLngState(e.lngLat.lng)
          setLatState(e.lngLat.lat)
          map.flyTo({ center: [e.lngLat.lng, e.lngLat.lat], speed: 0.5 })
        }
      });
      map.on('zoom', () => setZoomState(map.getZoom()));
      map.on("pitch", () => setPitchState(map.getPitch()))
      map.on("rotate", () => setBearingState(map.getBearing()))
    }
  }, [map, marker]);

  useEffect(() => {
    if (map) {
      console.log(map.getZoom() !== zoomState);
      
      if (map.getZoom() !== zoomState) map.setZoom(zoomState)
    }
  }, [map, zoomState])

  useEffect(() => {
    if (map) {
      if (map.getPitch() !== pitchState) map.setPitch(pitchState)
    }
  }, [map, pitchState])

  useEffect(() => {
    if (map) {
      if (map.getBearing() !== bearingState) map.setBearing(bearingState)
    }
  }, [map, bearingState])

  useEffect(() => {
    if (map) map.setStyle(styleState)
  }, [map, styleState])

  useEffect(() => {
    if (map) {
      if (map.hasControl(attribution!)) {
        map.removeControl(attribution!)

        const initializedAttr = new mapboxgl.AttributionControl({
          compact: false,
          customAttribution: attrState,
        });
        map.addControl(initializedAttr);
        setAttribution(initializedAttr)
      }
    }
  }, [map, attrState])

  useEffect(() => {
    if (map) {
      if (marker) {
        if (marker.getLngLat().lng !== lngState) {
          marker.setLngLat({ lng: lngState, lat: latState })
          map.flyTo({ center: [lngState, latState], speed: 0.5 })
        }
      }
    }
  }, [map, lngState])

  useEffect(() => {
    if (map) {
      if (marker) {
        if (marker.getLngLat().lat !== latState) {
          marker.setLngLat({ lng: lngState, lat: latState })
          map.flyTo({ center: [lngState, latState], speed: 0.5 })
        }
      }
    }
  }, [map, latState])


  return (
    <div ref={container} style={{ width: '100vw', height: '95vh' }} />
  )
}

export default Map

