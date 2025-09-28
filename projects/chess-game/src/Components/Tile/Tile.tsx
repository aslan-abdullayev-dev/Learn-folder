import classNames from "classnames";
import Piece from "../Piece/Piece";
import type { TileProps } from "./types";
import "./styles.scss";

const Tile = ({tile}: { tile: TileProps }) => {
  const {color, piece, name} = tile;

  const tileClassName = classNames("tile", {
    "bg--dark": color === "DARK",
    "bg--light": color === "LIGHT",
  });

  return (
    <div className={tileClassName}>
      {!piece && name}
      <Piece piece={piece}/>
    </div>
  );
};

export default Tile;
