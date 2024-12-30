type StepContent = string | NestingStep;

interface NestingStep {
  content: string;
  steps: Record<string, StepContent>;
}

type Steps = Record<string, StepContent>;