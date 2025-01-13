import React from 'react';
import StepCheckBox from './StepCheckBox';

interface StepTreeProps {
  steps: Record<string, StepContent>;
  checkedIds: string[];
  onToggle: (id: string, checked: boolean) => void;
}

const StepTree = ({ steps, checkedIds, onToggle }: StepTreeProps) => {
  return (
    <div>
      {Object.entries(steps).map(([key, content]) => (
        <StepCheckBox
          key={key}
          stepKey={key}
          content={content}
          descendants={getDescendants(content)}
          checkedIds={checkedIds}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

const getDescendants = (content: StepContent) => {
  return typeof content !== 'string'
    ? content.steps
    : null;
}

export default StepTree;