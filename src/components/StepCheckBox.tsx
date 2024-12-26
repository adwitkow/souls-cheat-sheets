import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Step } from '../models/step';

interface StepCheckBoxProps {
  step: Step;
  sectionId: string;
  checkedState: { [id: string]: boolean };
  onChange: (id: string, checked: boolean, childIds: string[]) => void;
}

const StepCheckBox = ({ step, sectionId, checkedState, onChange }: StepCheckBoxProps) => {
  const id = `${sectionId}-${step.id}`;

  const getAllChildIds = (steps: Step[]): string[] => {
    return steps.reduce((acc, childStep) => {
      const childId = `${sectionId}-${childStep.id}`;
      return [...acc, childId, ...getAllChildIds(childStep.steps)];
    }, [] as string[]);
  };
  const childIds = getAllChildIds(step.steps);

  const [isChecked, setIsChecked] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);

  useEffect(() => {
    if (childIds.length > 0) {
      const childCheckedStates = childIds.map((childId) => checkedState[childId] || false);
      const allChecked = childCheckedStates.every((state) => state);
      const someChecked = childCheckedStates.some((state) => state);

      setIsChecked(allChecked);
      setIsIndeterminate(someChecked && !allChecked);
    } else {
      setIsChecked(checkedState[id] || false);
      setIsIndeterminate(false);
    }
  }, [checkedState, childIds, id]);

  const handleToggle = (checked: boolean) => {
    onChange(id, checked, childIds);
  };

  return (
    <>
      <Form.Check
        id={id}
        type="checkbox"
        label={step.content}
        checked={isChecked}
        onChange={(e) => handleToggle(e.target.checked)}
        ref={(el: HTMLInputElement) => {
          if (el) {
            el.indeterminate = isIndeterminate;
          }
        }}
      />
      {step.steps.length > 0 && (
        <div className="ms-4">
          {step.steps.map((childStep) => (
            <StepCheckBox
              key={childStep.id}
              step={childStep}
              sectionId={sectionId}
              checkedState={checkedState}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default StepCheckBox;