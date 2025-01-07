import React from 'react';
import { useGame } from '../../contexts/GameContext';
import SectionContainer from '../../components/SectionContainer';
import { Accordion } from 'react-bootstrap';

const PlaythroughPage = () => {
  const { playthrough } = useGame();

  return (
    <Accordion alwaysOpen>
      {Object.entries(playthrough.sections).map(([key, section]) => (
        <SectionContainer
          key={key}
          sectionKey={key}
          section={section} />
      ))}
    </Accordion>
  )
}

export default PlaythroughPage;