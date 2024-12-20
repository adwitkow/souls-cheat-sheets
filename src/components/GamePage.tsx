import React from "react";
import game1 from '../data/game1.json';
import game2 from '../data/game2.json';
import { Playthrough } from "../model/playthrough";
import { Form } from "react-bootstrap";

interface GamePageProps {
  game: string
}

interface Dictionary<T> {
  [index:string]: T;
}

const gameMap: Dictionary<Playthrough> = {
  'game1': game1,
  'game2': game2
}

const GamePage = ({ game }: GamePageProps) => {
  var gameData: Playthrough = gameMap[game];
  console.log(gameData);
  return (
    <div>
      {gameData.sections.map((section, sectionIndex) => (
        <>
          <h1>{section.name}</h1>
          {section.steps.map((step, stepIndex) => (
            <Form.Check // prettier-ignore
              type='checkbox'
              id={`${section}-${stepIndex}`}
              label={step}
            />
          ))}
        </>
      ))};
    </div>
  )
}

export default GamePage;