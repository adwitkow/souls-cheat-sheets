import { JSX } from 'react';
import { useGame } from '../contexts/GameContext';
import React from 'react';

const LINK_REGEX = /@(?<key>[a-zA-Z0-9-]+)(\[(?<name>[^\]]+)\])?/g;

export const useTextWithLinks = () => {
  const { playthrough } = useGame();

  return (input: string) => {
    const elements: JSX.Element[] = [];
    let lastIndex = 0;

    for (const match of input.matchAll(LINK_REGEX)) {
      const matchIndex = match.index!;
      const fullMatch = match[0];
      const key = match.groups?.key;
      const name = match.groups?.name;

      if (!key) {
        throw new Error(`Key '${key}' is missing from the dictionary.`);
      }

      if (matchIndex > lastIndex) {
        elements.push(<span>{input.slice(lastIndex, matchIndex)}</span>);
      }

      console.log(key);

      const link = playthrough.links[key];
      const text = name ? name : link.defaultName;

      elements.push(
        <a href={link.wikiUrl}>{text}</a>
      )

      lastIndex = matchIndex + fullMatch.length;
    }

    if (lastIndex < input.length) {
      elements.push(<span>{input.slice(lastIndex)}</span>);
    }

    return elements;
  };
}