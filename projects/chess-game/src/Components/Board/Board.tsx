import "./styles.scss"

import { TILES } from "./constants";
import Tile from "../Tile/Tile";

const Board = () => {
  return (
    <div className="board">
      {TILES.map(row => (
        <div className="board__row">
          {row.map(tileItem => (<Tile tile={tileItem}/>))}
        </div>))}
    </div>
  )
}
export default Board