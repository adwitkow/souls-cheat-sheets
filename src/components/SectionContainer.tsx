import React, { useEffect, useMemo, useState } from 'react';
import { Section } from '../models/section';
import StepCheckBox from './StepCheckBox';
import { useProfile } from '../contexts/ProfileContext';
import { useGame } from '../contexts/GameContext';
import { Accordion, ProgressBar } from 'react-bootstrap';

interface SectionContainerProps {
  sectionKey: string;
  section: Section;
}

const countAllSteps = (steps: Steps): number => {
  return Object.values(steps).reduce((total, step) => {
    total++;

    if (typeof step !== 'string') {
      total += countAllSteps(step.steps);
    }

    return total;
  }, 0);
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
  const [stepCount] = useState(countAllSteps(section.steps));
  const [checkedStepCount, setCheckedStepCount] = useState(() => {
    return Object.keys(checkedState).filter(key => checkedState[key]).length;
  })
  const percentage = useMemo(() => {
    return checkedStepCount / stepCount * 100;
  }, [checkedStepCount, stepCount]);

  useEffect(() => {
    const checkedKeys = Object.keys(checkedState)
      .filter(key => checkedState[key]);
    setCheckedStepCount(checkedKeys.length);

    saveCheckedSteps(game, sectionKey, checkedKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedState, saveCheckedSteps, sectionKey]);

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
    <Accordion.Item key={sectionKey} eventKey={sectionKey}>
      <Accordion.Header>
        <div style={{ flex: 1 }}>{section.name}</div>

        <div style={{ flex: 2, padding: "0 10px" }}>
          <ProgressBar now={percentage} label={`${checkedStepCount}/${stepCount}`} />
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {Object.entries(section.steps).map(([key, content]) => (
          <StepCheckBox
            key={key}
            stepKey={key}
            stepContent={content}
            checkedState={checkedState}
            onChange={handleChange}
          />
        ))}

      </Accordion.Body>
    </Accordion.Item>
  );
};

export default SectionContainer;