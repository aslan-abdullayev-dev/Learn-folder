import { useDroppable } from "@dnd-kit/core";
import classNames from "classnames";
import Piece from "../Piece/Piece";
import type { TileProps } from "./types";
import "./styles.scss";

const Tile = ({tile}: { tile: TileProps }) => {
  const {color, piece, name} = tile;

  const {setNodeRef, isOver} = useDroppable({id: name});

  const tileClassName = classNames("tile", {
    "bg--dark": color === "DARK",
    "bg--light": color === "LIGHT",
    "tile--over": isOver,
  });

  return (
    <div ref={setNodeRef} className={tileClassName}>
      {!piece && name}
      <Piece piece={piece} id={name}/>
    </div>
  );
};

export default Tile;
