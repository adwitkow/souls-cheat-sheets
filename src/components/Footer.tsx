import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-body-tertiary p-3 border-top'>
      <Container>
        <Row>
          <span>
            <>Made with </>
            <FontAwesomeIcon icon={faHeart} className='text-danger' />
            <> using React</>
          </span>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;