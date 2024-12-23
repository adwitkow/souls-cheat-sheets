import React from 'react';
import PlaythroughPage from '../pages/PlaythroughPage';
import SettingsPage from '../pages/SettingsPage';

type RouteConfig = {
  path: string;
  name: string;
  Component: React.FC;
};

export const routesConfig: RouteConfig[] = [
  { path: '/', name: 'Playthrough', Component: () => (<PlaythroughPage />) },
  { path: '/about', name: 'About', Component: () => <h1>About Page</ h1 > },
  { path: '/settings', name: 'Settings', Component: () => <SettingsPage /> },
];