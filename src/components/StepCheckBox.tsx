import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTextWithLinks } from '../hooks/useTextWithLinks';

interface StepCheckBoxProps {
  stepKey: string;
  stepContent: StepContent;
  checkedState: { [id: string]: boolean };
  onChange: (id: string, checked: boolean, childIds: string[]) => void;
}

const StepCheckBox = ({ stepKey, stepContent, checkedState, onChange }: StepCheckBoxProps) => {
  const textWithLinks = useTextWithLinks();

  const collectIdsFromChildren = (steps: Record<string, StepContent>): string[] => {
    const entries = Object.entries(steps);
    return entries.reduce((acc, [key, stepContent]) => {
      const descendants = resolveDescendantIds(stepContent);
      return [...acc, key, ...descendants];
    }, [] as string[]);
  };

  const resolveDescendantIds = (stepContent: StepContent) => {
    return typeof stepContent === 'string'
      ? []
      : collectIdsFromChildren(stepContent.steps);
  }

  const descendantIds = resolveDescendantIds(stepContent);

  const [isChecked, setIsChecked] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);

  useEffect(() => {
    if (descendantIds.length > 0) {
      const childCheckedStates = descendantIds.map((childId) => checkedState[childId] || false);
      const allChecked = childCheckedStates.every((state) => state);
      const someChecked = childCheckedStates.some((state) => state);

      setIsChecked(allChecked);
      setIsIndeterminate(someChecked && !allChecked);
    } else {
      setIsChecked(checkedState[stepKey] || false);
      setIsIndeterminate(false);
    }
  }, [checkedState, descendantIds, stepKey]);

  const handleToggle = (checked: boolean) => {
    onChange(stepKey, checked, descendantIds);
  };

  const content = typeof stepContent === 'string'
    ? stepContent
    : stepContent.content;
  const label = textWithLinks(content);

  return (
    <div key={stepKey}>
      <Form.Check
        id={stepKey}
        type="checkbox"
        label={label}
        checked={isChecked}
        onChange={(e) => handleToggle(e.target.checked)}
        ref={(el: HTMLInputElement) => {
          if (el) {
            el.indeterminate = isIndeterminate;
          }
        }}
      />
      {typeof stepContent !== 'string' && (
        <div className="ms-4">
          {Object.entries(stepContent.steps).map(([key, childStep]) => (
            <StepCheckBox
              key={key}
              stepKey={key}
              stepContent={childStep}
              checkedState={checkedState}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StepCheckBox;