import React, { useEffect, useState } from 'react';
import { Section } from '../models/section';
import StepCheckBox from './StepCheckBox';
import { useProfile } from '../contexts/ProfileContext';
import { useGame } from '../contexts/GameContext';

interface SectionContainerProps {
  section: Section;
}

const SectionContainer = ({ section }: SectionContainerProps) => {
  const { saveCheckedSteps, loadCheckedSteps } = useProfile();
  const { game } = useGame();
  const [checkedState, setCheckedState] = useState<{ [id: string]: boolean }>(() => {
    const checkedIds = loadCheckedSteps(game, section.name);

    return checkedIds.reduce((dict, id: string) => {
      dict[id] = true;
      return dict;
    }, {} as { [id: string]: boolean });
  });

  useEffect(() => {
    const checkedKeys = Object.keys(checkedState)
      .filter(key => checkedState[key]);

    saveCheckedSteps(game, section.name, checkedKeys);
  }, [checkedState, saveCheckedSteps, section.name, game]);

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
      <h1>{section.displayName}</h1>
      {section.steps.map(step => (
        <StepCheckBox
          key={step.id}
          step={step}
          sectionId={section.name}
          checkedState={checkedState}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default SectionContainer;