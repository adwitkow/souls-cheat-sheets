import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useGame } from '../contexts/GameContext';
import { GAMES } from '../constants';

const GamePicker = () => {
  const {game, setGame} = useGame();

  const handleClick = async (e: any) => {
    e.preventDefault();
    const name: string = e.target.text;
    setGame(name);
  }

  return (
    <DropdownButton
      id='dropdown-basic-button'
      title={game}>
      {GAMES.map(game => (
        <Dropdown.Item
          key={game}
          onClick={handleClick}>
          {game}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

export default GamePicker;