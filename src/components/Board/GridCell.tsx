import { Cell, Player } from "../../logic";

import React from "react";

interface GridCellProps {
  readonly cell: Cell;
}

/** Render a cell in the grid. */
const GridCell = ({ cell }: GridCellProps) => {
  if (!cell) {
    return null;
  }
  const classes = [
    "piece",
    cell.player === Player.Red ? "red" : "",
    cell.player === Player.Blue ? "blue" : "",
  ];
  return <span className={classes.join(" ")}>{cell.token}</span>;
};

export default GridCell;