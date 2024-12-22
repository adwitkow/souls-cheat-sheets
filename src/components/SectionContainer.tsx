import React from 'react';
import { Section } from '../models/section';
import StepCheckBox from './StepCheckBox';

interface SectionContainerProps {
  section: Section;
}

const SectionContainer = ({ section }: SectionContainerProps) => {

  const handleChange = (id: string, checked: boolean) => {
    console.log(`${id}: ${checked}`);
  }

  return (
    <div>
      <h1>{section.displayName}</h1>
      {section.steps.map(step => (
        <StepCheckBox
          step={step}
          sectionId={section.name}
          checked={false}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}

export default SectionContainer;