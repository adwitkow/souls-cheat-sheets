import React, { useEffect, useState } from 'react';
import { Section } from '../models/section';
import StepCheckBox from './StepCheckBox';
import { useProfile } from '../contexts/ProfileContext';
import { useGame } from '../contexts/GameContext';

interface SectionContainerProps {
  sectionKey: string;
  section: Section;
}

const SectionContainer = ({ sectionKey, section }: SectionContainerProps) => {
  const { saveCheckedSteps, loadCheckedSteps } = useProfile();
  const { game } = useGame();
  const [checkedState, setCheckedState] = useState<{ [id: string]: boolean }>(() => {
    const checkedIds = loadCheckedSteps(game, sectionKey);

    return checkedIds.reduce((dict, id: string) => {
      dict[id] = true;
      return dict;
    }, {} as { [id: string]: boolean });
  });

  useEffect(() => {
    const checkedKeys = Object.keys(checkedState)
      .filter(key => checkedState[key]);

    saveCheckedSteps(game, sectionKey, checkedKeys);
  }, [checkedState, saveCheckedSteps, sectionKey, game]);

  const handleChange = (id: string, checked: boolean, childIds: string[]) => {
    setCheckedState(prevState => {
      const updatedState = { ...prevState, [id]: checked };
      childIds.forEach(childId => {
        updatedState[childId] = checked;
      });
      
      return updatedState;
    });
  };

  return (
    <div>
      <h1>{section.name}</h1>
      {Object.entries(section.steps).map(([key, content]) => (
        <StepCheckBox
          stepKey={key}
          stepContent={content}
          sectionId={sectionKey}
          checkedState={checkedState}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default SectionContainer;