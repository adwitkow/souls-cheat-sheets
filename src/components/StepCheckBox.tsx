import React from 'react';
import { Form } from 'react-bootstrap';
import { Step } from '../models/step';

interface StepCheckBoxProps {
  step: Step;
  sectionId: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

const StepCheckBox = ({ step, sectionId, checked, onChange }: StepCheckBoxProps) => {
  const id = `${sectionId}-${step.id}`
  const handleChange = () => onChange(id, !checked);

  return (
    <Form.Check
      type='checkbox'
      id={id}
      label={step.content}
      checked={checked}
      onChange={handleChange} />
  )
}

export default StepCheckBox;