import React, { useState } from "react";
import { canMove, validMovements } from "../logic/move";
import { canPlace, validPlacements } from "../logic/place";

import Grid from "./Grid";
import Selector from "./Selector";
import { Token } from "../logic";

enum State {
  None,
  Place,
  Move,
  Rotate,
}

const DEFAULT_STATE = State.None;
const DEFAULT_HIGHLIGHTED = new Set<number>();
const DEFAULT_TOKEN = Token.Blocker;
const DEFAULT_INDEX = -1;

interface BoardProps {
  G: any;
  ctx: any;
  moves: any;
}

const Board = ({ G, ctx, moves }: BoardProps) => {
  const { pieces } = G;
  const { currentPlayer: player } = ctx;

  const [state, setState] = useState(DEFAULT_STATE);
  const [highlighted, setHighlighted] = useState(DEFAULT_HIGHLIGHTED);
  const [activeToken, setActiveToken] = useState(DEFAULT_TOKEN);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);

  const transitions = {
    toNone: () => {
      setState(State.None);
      setHighlighted(DEFAULT_HIGHLIGHTED);
      setActiveToken(DEFAULT_TOKEN);
      setActiveIndex(DEFAULT_INDEX);
    },
    toPlace: (token: Token) => {
      setState(State.Place);
      setHighlighted(validPlacements(pieces, { player, token }));
      setActiveToken(token);
      setActiveIndex(DEFAULT_INDEX);
    },
    toMove: (index: number) => {
      setState(State.Move);
      setHighlighted(validMovements(pieces, player, index));
      setActiveToken(DEFAULT_TOKEN);
      setActiveIndex(index);
    },
  };

  const onTokenSelect = (token: Token) => transitions.toPlace(token);

  const onCellClick = (index: number) => {
    if (
      index !== activeIndex &&
      pieces[index] &&
      pieces[index].player === player
    ) {
      transitions.toMove(index);
    } else if (
      state === State.Place &&
      canPlace(pieces, { player, token: activeToken }, index)
    ) {
      moves.placePiece(activeToken, index);
      transitions.toNone();
    } else if (
      state === State.Move &&
      canMove(pieces, player, activeIndex, index)
    ) {
      moves.movePiece(activeIndex, index);
      transitions.toNone();
    }
  };

  return (
    <div>
      <Grid
        pieces={G.pieces}
        highlighted={highlighted}
        onCellClick={onCellClick}
      />
      <Selector onTokenSelect={onTokenSelect} />
      <p>{"State: " + State[state]}</p>
    </div>
  );
};

export default Board;
