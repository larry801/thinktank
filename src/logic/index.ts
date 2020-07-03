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

/** Return the opponent of a player. */
export const opponentOf = (player: Player): Player => {
  switch (player) {
    case Player.Red:
      return Player.Blue;
    case Player.Blue:
      return Player.Red;
  }
};

export interface Piece {
  token: Token;
  player: Player;
}

/** Represents the game state. Must be serializable. */
export interface G {
  cells: Array<Piece | null>;
  hands: {
    [Player.Red]: Array<Token>;
    [Player.Blue]: Array<Token>;
  };
}

/** Create a new hand. */
export const createHand = (): Array<Token> => {
  const hand = new Array<Token>();
  hand.push(...Array(3).fill(Token.Blocker));
  hand.push(...Array(5).fill(Token.UpTank));
  hand.push(...Array(5).fill(Token.DownTank));
  hand.push(...Array(5).fill(Token.LeftTank));
  hand.push(...Array(5).fill(Token.RightTank));
  hand.push(...Array(2).fill(Token.OrthogonalInfiltrator));
  hand.push(...Array(2).fill(Token.DiagonalInfiltrator));
  hand.push(Token.Mine);
  return hand;
};

/** Add a token to a hand. */
export const addToHand = (hand: Array<Token>, token: Token) => {
  switch (token) {
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      hand.push(Token.UpTank, Token.DownTank, Token.LeftTank, Token.RightTank);
      break;
    default:
      hand.push(token);
  }
};

/** Remove a token from a hand. */
export const removeFromHand = (hand: Array<Token>, token: Token) => {
  switch (token) {
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      hand.splice(hand.indexOf(Token.UpTank), 1);
      hand.splice(hand.indexOf(Token.DownTank), 1);
      hand.splice(hand.indexOf(Token.LeftTank), 1);
      hand.splice(hand.indexOf(Token.RightTank), 1);
      break;
    default:
      hand.splice(hand.indexOf(token), 1);
      break;
  }
};
