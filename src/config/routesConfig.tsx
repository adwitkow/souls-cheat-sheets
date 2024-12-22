import React from 'react';
import PlaythroughPage from '../components/PlaythroughPage';

type RouteConfig = {
  path: string;
  name: string;
  Component: React.FC;
};

export const routesConfig: RouteConfig[] = [
  { path: '/', name: 'Playthrough', Component: () => (<PlaythroughPage />) },
  { path: '/about', name: 'About', Component: () => <h1>About Page</ h1 > },
  { path: '/settings', name: 'Settings', Component: () => <h1>Settings Page</ h1 > },
];