import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTextWithLinks } from '../hooks/useTextWithLinks';

interface StepCheckBoxProps {
  stepKey: string;
  stepContent: StepContent;
  sectionId: string;
  checkedState: { [id: string]: boolean };
  onChange: (id: string, checked: boolean, childIds: string[]) => void;
}

const StepCheckBox = ({ stepKey, stepContent, sectionId, checkedState, onChange }: StepCheckBoxProps) => {
  const textWithLinks = useTextWithLinks();
  const id = `${sectionId}-${stepKey}`;

  const collectIdsFromChildren = (steps: Record<string, StepContent>): string[] => {
    const entries = Object.entries(steps);
    return entries.reduce((acc, [key, stepContent]) => {
      const childId = `${sectionId}-${key}`;
      const descendants = resolveDescendantIds(stepContent);
      return [...acc, childId, ...descendants];
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
      setIsChecked(checkedState[id] || false);
      setIsIndeterminate(false);
    }
  }, [checkedState, descendantIds, id]);

  const handleToggle = (checked: boolean) => {
    onChange(id, checked, descendantIds);
  };

  const createCheckBoxComponent = (content: string) => {
    const label = textWithLinks(content);
    return (
      <Form.Check
        id={id}
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
    )
  }

  if (typeof stepContent === 'string') {
    return createCheckBoxComponent(stepContent);
  } else {
    return (
      <>
        {createCheckBoxComponent(stepContent.content)}
        <div className="ms-4">
          {Object.entries(stepContent.steps).map(([key, childStep]) => (
            <StepCheckBox
              stepKey={key}
              stepContent={childStep}
              sectionId={sectionId}
              checkedState={checkedState}
              onChange={onChange}
            />
          ))}
        </div>
      </>
    );
  }
};

export default StepCheckBox;