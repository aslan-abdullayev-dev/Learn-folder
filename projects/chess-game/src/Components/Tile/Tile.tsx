import classNames from "classnames";
import { useMemo } from "react";

import "./styles.scss"

import type { TileProps } from "./types";
import Piece from "../Piece/Piece";

const Tile = ({tile}: { tile: TileProps }) => {
  const {color, piece} = tile

  const tileClassName = useMemo(() => classNames(
    "tile",
    {
      "bg--dark": color === "DARK",
      "bg--light": color === "LIGHT"
    }
  ), [color])


  return (
    <div className={tileClassName}>
      <Piece piece={piece}/>
    </div>
  )
}

export default Tile