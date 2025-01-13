import React, { useEffect, useMemo, useState } from 'react';
import { Section } from '../models/section';
import { useProfile } from '../contexts/ProfileContext';
import { useGame } from '../contexts/GameContext';
import { Accordion, ProgressBar } from 'react-bootstrap';
import StepTree from './StepTree';

type StepRelationship = {
  parent: string | null;
  descendants: string[];
}

interface SectionContainerProps {
  sectionKey: string;
  section: Section;
}

const SectionContainer = ({ sectionKey, section }: SectionContainerProps) => {
  const { saveCheckedSteps, loadCheckedSteps } = useProfile();
  const { game } = useGame();

  const [checkedIds, setCheckedIds] = useState(loadCheckedSteps(game, sectionKey));
  const relationshipMap = useMemo(() => mapRelationships(section.steps), [section.steps])

  const stepCount = useMemo(() => countAllSteps(section.steps), [section.steps]);
  const [checkedStepCount, setCheckedStepCount] = useState(checkedIds.length);

  const percentage = useMemo(() => {
    return checkedStepCount / stepCount * 100;
  }, [checkedStepCount, stepCount]);

  useEffect(() => {
    setCheckedStepCount(checkedIds.length);
    saveCheckedSteps(game, sectionKey, [...checkedIds]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedIds]);

  const handleStepToggled = (id: string, checked: boolean) => {
    const relationships = relationshipMap[id];
    const descendants = relationships.descendants;
    const parent = relationships.parent;
    setCheckedIds(prev => {
      if (!checked) {
        const toRemove = [id, ...descendants, parent];
        return prev.filter(existing => !toRemove.includes(existing));
      }

      if (prev.includes(id)) {
        return prev;
      }

      let result = [...prev, ...descendants, id];

      if (parent) {
        const parentDescendants = relationshipMap[parent].descendants;
        if (parentDescendants.every(descendant => result.includes(descendant))) {
          result.push(parent);
        }
      }

      const unique = result.filter((val, idx, arr) => arr.indexOf(val) === idx);
      return unique;
    });
  };

  const isProgressFilled = percentage >= 100;
  const progressBarLabel = isProgressFilled
    ? 'Done!'
    : `${checkedStepCount}/${stepCount}`;
  const progressBarVariant = isProgressFilled
    ? 'success'
    : 'primary';

  return (
    <Accordion.Item key={sectionKey} eventKey={sectionKey}>
      <Accordion.Header className='sticky-top'>
        <div style={{ flex: 1 }}>{section.name}</div>
        <div style={{ flex: 2, padding: "0 10px" }}>
          <ProgressBar now={percentage} label={progressBarLabel} variant={progressBarVariant} />
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <StepTree
          steps={section.steps}
          checkedIds={checkedIds}
          onToggle={handleStepToggled}
        />
      </Accordion.Body>
    </Accordion.Item>
  );
};

const countAllSteps = (steps: Record<string, StepContent>): number => {
  return Object.values(steps).reduce((total, step) => {
    total++;

    if (typeof step !== 'string') {
      total += countAllSteps(step.steps);
    }

    return total;
  }, 0);
}

const mapRelationships = (
  steps: Record<string, StepContent>,
  parent: string | null = null
): Record<string, StepRelationship> => {
  const result: Record<string, StepRelationship> = {};

  function traverse(stepId: string, step: StepContent, parent: string | null): string[] {
    const descendants: string[] = [];
    result[stepId] = { parent, descendants };

    if (typeof step !== "string") {
      for (const [childId, childStep] of Object.entries(step.steps)) {
        const childDescendants = traverse(childId, childStep, stepId);
        descendants.push(childId, ...childDescendants);
      }
    }

    result[stepId].descendants = descendants;
    return descendants;
  }

  for (const [stepId, step] of Object.entries(steps)) {
    traverse(stepId, step, parent);
  }

  return result;
}

export default SectionContainer;