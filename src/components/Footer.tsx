import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className='bg-body-tertiary p-3 border-top'>
      <Container>
        <Stack direction='horizontal'>
          <div>
            <>Made with </>
            <FontAwesomeIcon icon={faHeart} className='text-danger' />
            <> using React</>
          </div>
          <div className='ms-auto' />
          <div>
            <Button
              href='https://github.com/adwitkow/souls-cheat-sheets/'
              target='_blank'>
              <FontAwesomeIcon icon={faGithub} /> Source
            </Button>
          </div>
        </Stack>
      </Container>
    </footer>
  )
}

export default Footer;