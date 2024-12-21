import React, { useState } from 'react';
import './App.scss';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import GamePage from './components/GamePage';

const App = () => {
  const games = [
    'Dark Souls', 'Dark Souls II: SOTFS', 'Dark Souls III'
  ];

  const [currentGame, setCurrentGame] = useState<string>(games[0]);

  const handleClick = async (e: any) => {
    e.preventDefault();
    const name: string = e.target.text;
    setCurrentGame(name);
  }

  return (
    <div className="container">
      <DropdownButton id="dropdown-basic-button" title={currentGame} className="float-right">
        {games.map(game => (
          <Dropdown.Item key={game} onClick={handleClick}>{game}</Dropdown.Item>
        ))}
      </DropdownButton>
      <GamePage game={currentGame} />
    </div>
  );
}

export default App;
