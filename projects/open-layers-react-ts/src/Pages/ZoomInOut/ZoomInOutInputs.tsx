
function ZoomInOutInputs({ zoom, setZoom }: any) {
  return (
    <input
      type="number"
      value={zoom}
      onChange={(e: any) => setZoom(e.target.value)}
    />
  )
}

export default ZoomInOutInputs