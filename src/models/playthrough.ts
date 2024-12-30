import { Link } from './link';
import { Section } from './section';

export interface Playthrough {
  game: string;
  sections: Record<string, Section>;
  links: Record<string, Link>;
}