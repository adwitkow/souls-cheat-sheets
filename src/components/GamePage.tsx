import React from 'react';
import das1 from '../data/das1.json';
import das2 from '../data/das2.json';
import das3 from '../data/das3.json';
import { Playthrough } from '../models/playthrough';
import { Form } from 'react-bootstrap';
import SectionContainer from './SectionContainer';

interface GamePageProps {
  game: string
}

interface Dictionary<T> {
  [index:string]: T;
}

const gameMap: Dictionary<Playthrough> = {
  'Dark Souls': das1,
  'Dark Souls II: SOTFS': das2,
  'Dark Souls III': das3
}

const GamePage = ({ game }: GamePageProps) => {
  console.log({...localStorage});
  var gameData: Playthrough = gameMap[game];
  return (
    <div>
      {gameData.sections.map((section) => (
          <SectionContainer section={section} />
      ))}
    </div>
  )
}

export default GamePage;