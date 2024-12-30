import React from 'react';
import { useGame } from '../../contexts/GameContext';
import SectionContainer from '../../components/SectionContainer';

const PlaythroughPage = () => {
  const { playthrough } = useGame();

  return (
    <>
      {Object.entries(playthrough.sections).map(([key, section]) => (
        <SectionContainer
          key={key}
          sectionKey={key}
          section={section}
        />
      ))}
    </>
  )
}

export default PlaythroughPage;