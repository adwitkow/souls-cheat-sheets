import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { DARK_SOULS, DARK_SOULS_II, DARK_SOULS_III } from '../constants';
import das1 from '../data/das1.json';
import das2 from '../data/das2.json';
import das3 from '../data/das3.json';
import { Playthrough } from '../models/playthrough';

type Game = typeof DARK_SOULS | typeof DARK_SOULS_II | typeof DARK_SOULS_III;
const DEFAULT_GAME = DARK_SOULS;
const DEFAULT_PLAYTHROUGH: Playthrough = {
  game: '',
  sections: {},
  links: {}
}

type GameContextType = {
  playthrough: Playthrough;
  game: Game;
  setGame: (game: Game) => void;
};

const GameContext = createContext<GameContextType>({
  playthrough: DEFAULT_PLAYTHROUGH,
  game: DEFAULT_GAME,
  setGame: () => { },
});

const GetGameData = (game: string): Playthrough => {
  // I HATE SWITCH STATEMENTS
  // GIVE ME A DICTIONARY THAT WORKS OUT OF THE BOX PLEASE
  // FOR THE LOVE OF GOD
  switch (game) {
    case DARK_SOULS:
      return das1;
    case DARK_SOULS_II:
      return das2;
    case DARK_SOULS_III:
      return das3;
    default:
      throw new Error(`Game ${game} does not have a defined data file.`);
  }
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(DEFAULT_GAME);
  const [playthrough, setPlaythrough] = useState<Playthrough>(GetGameData(game));

  useEffect(() => {
    const gameData = GetGameData(game);
    setPlaythrough(gameData);
  }, [game])

  return (
    <GameContext.Provider value={{ playthrough, game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};