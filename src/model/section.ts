import { Step } from "./step";

export interface Section {
    id: number;
    name: string;
    displayName: string;
    wikiUrl: string;
    steps: Step[];
}