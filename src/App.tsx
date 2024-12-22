import React, { useState } from 'react';
import './App.scss';
import { Container, Dropdown, DropdownButton, Navbar } from 'react-bootstrap';
import GamePage from './components/GamePage';
import Footer from './components/Footer';

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
    <>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='#'>Souls Cheat Sheets</Navbar.Brand>
          <DropdownButton id='dropdown-basic-button' title={currentGame} className='justify-content-end'>
          {games.map(game => (
            <Dropdown.Item key={game} onClick={handleClick}>{game}</Dropdown.Item>
          ))}
        </DropdownButton>
        </Container>
      </Navbar>
      <Container>
        <GamePage game={currentGame} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
