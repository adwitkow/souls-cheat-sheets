import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTextWithLinks } from '../hooks/useTextWithLinks';
import StepTree from './StepTree';

interface StepCheckBoxProps {
  stepKey: string;
  content: StepContent;
  descendants: Record<string, StepContent> | null;
  checkedIds: string[];
  onToggle: (id: string, checked: boolean) => void;
}

const StepCheckBox = ({ stepKey, content, descendants, checkedIds, onToggle }: StepCheckBoxProps) => {
  const textWithLinks = useTextWithLinks();

  const [isChecked, setIsChecked] = useState(checkedIds.includes(stepKey));
  const [isIndeterminate, setIsIndeterminate] = useState(false);

  useEffect(() => {
    if (!descendants) {
      setIsIndeterminate(false);
    } else {
      // this has to be ran recursively
      const childCheckedStates = Object.entries(descendants).map(([key, step]) => {
        return checkedIds.includes(key);
      });
      const allChecked = childCheckedStates.every(state => state);
      const someChecked = childCheckedStates.some(state => state);

      setIsIndeterminate(someChecked && !allChecked);
    }

    setIsChecked(checkedIds.includes(stepKey));
  }, [checkedIds, descendants, stepKey]);

  const handleToggle = (checked: boolean) => {
    onToggle(stepKey, checked);
  };

  const label = typeof content !== 'string'
    ? textWithLinks(content.content)
    : textWithLinks(content);

  return (
    <div key={stepKey}>
      <Form.Check
        id={stepKey}
        type='checkbox'
        label={label}
        checked={isChecked}
        onChange={e => handleToggle(e.target.checked)}
        ref={(el: HTMLInputElement) => {
          if (el) {
            el.indeterminate = isIndeterminate;
          }
        }}
      />
      {descendants && (
        <div className='ms-4'>
          <StepTree
            steps={descendants}
            checkedIds={checkedIds}
            onToggle={onToggle}
          />
        </div>
      )}
    </div>
  );
};

export default StepCheckBox;