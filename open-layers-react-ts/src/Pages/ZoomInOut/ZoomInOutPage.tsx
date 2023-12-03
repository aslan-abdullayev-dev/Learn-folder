import { useState } from "react"

import ZoomInOutInputs from "./ZoomInOutInputs"
import ZoomInOutMap from "./ZoomInOutMap"

function ZoomInOutPage() {
  const [zoom, setZoom] = useState(2)

  return (
    <div>
      <ZoomInOutInputs zoom={zoom} setZoom={setZoom} />
      <ZoomInOutMap zoom={zoom} setZoom={setZoom} />
    </div>
  )
}

export default ZoomInOutPage