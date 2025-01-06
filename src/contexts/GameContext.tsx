import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { DARK_SOULS, DARK_SOULS_II, DARK_SOULS_III } from '../constants';
import das1 from '../data/das1.json';
import das2 from '../data/das2.json';
import das3 from '../data/das3.json';
import { Playthrough } from '../models/playthrough';

type Game = typeof DARK_SOULS | typeof DARK_SOULS_II | typeof DARK_SOULS_III;
const DEFAULT_GAME = DARK_SOULS;
const DEFAULT_PLAYTHROUGH: Playthrough = {
  name: '',
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

const gameFiles = {
  [DARK_SOULS]: das1,
  [DARK_SOULS_II]: das2,
  [DARK_SOULS_III]: das3,
}

const GetGameData = (game: string): Playthrough => {
  return gameFiles[game];
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