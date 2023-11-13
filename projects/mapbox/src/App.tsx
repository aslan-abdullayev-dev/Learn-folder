import { useState } from 'react'
import Map from './Map/Map';

function App() {
  const [lngState, setLngState] = useState(0);
  const [latState, setLatState] = useState(0);
  const [zoomState, setZoomState] = useState(2);
  const [styleState, setStyleState] = useState("mapbox://styles/mapbox/light-v11");
  const [pitchState, setPitchState] = useState(0);
  const [bearingState, setBearingState] = useState(0);
  const [attrState, setAttrState] = useState("Attr Text");


  return (
    <>
      <select
        onChange={e => setStyleState(e.target.value)}
      >
        <option value="mapbox://styles/mapbox/light-v11">V11</option>
        <option value="mapbox://styles/mapbox/light-v10">V10</option>
      </select >
      <input type="text" value={attrState} onChange={e => setAttrState(e.target.value)} />
      <input type="number" value={zoomState} onChange={e => setZoomState(+e.target.value)} />
      <input type="number" value={pitchState} onChange={e => setPitchState(+e.target.value)} />
      <input type="number" value={bearingState} onChange={e => setBearingState(+e.target.value)} />
      <input type="number" value={lngState} onChange={e => setLngState(+e.target.value)} />
      <input type="number" value={latState} onChange={e => setLatState(+e.target.value)} />
      <Map
        // states
        lngState={lngState}
        latState={latState}
        zoomState={zoomState}
        styleState={styleState}
        pitchState={pitchState}
        bearingState={bearingState}
        attrState={attrState}
        // handlers
        setLngState={setLngState}
        setLatState={setLatState}
        setZoomState={setZoomState}
        setPitchState={setPitchState}
        setBearingState={setBearingState}
        setAttrState={setAttrState}
      />
    </>
  )
}

export default App
