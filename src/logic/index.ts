export enum Token {
  Blocker = "O",
  UpTank = "^",
  DownTank = "v",
  LeftTank = "<",
  RightTank = ">",
  OrthogonalInfiltrator = "+",
  DiagonalInfiltrator = "X",
  Mine = "*",
  Base = "@",
}

export enum Player {
  Red = "0",
  Blue = "1",
}

export interface Piece {
  token: Token;
  player: Player;
}
