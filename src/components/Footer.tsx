import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-body-tertiary p-3">
      <Container>
        <Row>
          <span>
            <span>Made with </span>
            <FontAwesomeIcon icon={faHeart} className='text-danger' />
            <span> using React</span>
          </span>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;