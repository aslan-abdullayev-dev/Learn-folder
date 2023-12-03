import { Link, Outlet } from "react-router-dom"

function App() {
  return (
    <div className="root-app">
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <Link to="/" >Home</Link>
        <Link to="/zoom-in-out" >Zoom In Out</Link>
      </div>
      <Outlet />
    </div>

  )
}

export default App
