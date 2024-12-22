import React from 'react';
import './App.scss';
import { Container } from 'react-bootstrap';
import GamePage from './components/GamePage';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import { ProfileProvider } from './contexts/ProfileContext';
import { GameProvider } from './contexts/GameContext';

const App = () => {
  return (
    <ProfileProvider>
      <GameProvider>
        <NavigationBar />
        <Container>
          <GamePage />
        </Container>
        <Footer />
      </GameProvider>
    </ProfileProvider>
  );
}

export default App;
