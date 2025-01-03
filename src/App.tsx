import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import { ProfileProvider } from './contexts/ProfileContext';
import { GameProvider } from './contexts/GameContext';
import { routesConfig } from './config/routesConfig';

const App = () => {
  return (
    <BrowserRouter basename='/souls-cheat-sheets'>
      <ProfileProvider>
        <GameProvider>
          <NavigationBar />
          <Container className='mt-3 mb-3'>
            <Routes>
              {routesConfig.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </Container>
          <Footer />
        </GameProvider>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
