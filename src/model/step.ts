import { Link } from "./link";

export interface Step {
  id: number;
  content: string;
  links: Link[];
  steps: Step[];
  filters: string[];
}