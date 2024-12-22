import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import GamePicker from './GamePicker';

const NavigationBar = () => {
  return (
    <Navbar expand='lg' className='bg-body-tertiary border-bottom'>
      <Container>
        <Navbar.Brand href='#'>Souls Cheat Sheets</Navbar.Brand>
        <div className='justify-content-end'>
          <GamePicker />
        </div>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;