import React from 'react';
import './NavigationBar.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';
import GamePicker from './GamePicker';
import { routesConfig } from '../config/routesConfig';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar expand='lg' className='bg-body-tertiary border-bottom'>
      <Container>
        <Navbar.Brand href='#'>Souls Cheat Sheets</Navbar.Brand>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav variant='pills'>
            {routesConfig.map(({path, name}) => (
              <Nav.Link as={NavLink} key={path} to={path}>
                {name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
        <div className='justify-content-end'>
          <GamePicker />
        </div>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
      </Container>
    </Navbar>
  )
}

export default NavigationBar;