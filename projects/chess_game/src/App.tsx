import "./Assets/Styles/variables.scss";
import "./app.scss";

import Board from "./Components/Board/Board";

function App() {
  return (
    <div className="app">
      <div className="board__wrapper">
        <Board/>
      </div>
    </div>
  )
}

export default App
