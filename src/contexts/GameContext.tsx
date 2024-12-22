import React, { createContext, useState, ReactNode, useContext } from "react";
import { DARK_SOULS, DARK_SOULS_II, DARK_SOULS_III } from '../constants';

type Game = typeof DARK_SOULS | typeof DARK_SOULS_II | typeof DARK_SOULS_III;
const defaultGame = DARK_SOULS;

type GameContextType = {
  game: Game;
  setGame: (game: Game) => void;
};

const GameContext = createContext<GameContextType>({
  game: defaultGame,
  setGame: () => { },
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(defaultGame);

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};