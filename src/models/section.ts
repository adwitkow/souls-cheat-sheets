export interface Section {
  name: string;
  wikiUrl?: string;
  steps: Record<string, StepContent>;
}