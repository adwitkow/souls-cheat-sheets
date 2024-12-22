import React from 'react';
import das1 from '../data/das1.json';
import das2 from '../data/das2.json';
import das3 from '../data/das3.json';
import { Playthrough } from '../models/playthrough';
import SectionContainer from './SectionContainer';
import { useGame } from '../contexts/GameContext';
import { DARK_SOULS, DARK_SOULS_II, DARK_SOULS_III } from '../constants';

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

const GamePage = () => {
  const { game } = useGame();
  const gameData = GetGameData(game);
  
  return (
    <div>
      {gameData.sections.map((section) => (
        <SectionContainer section={section} />
      ))}
    </div>
  )
}

export default GamePage;