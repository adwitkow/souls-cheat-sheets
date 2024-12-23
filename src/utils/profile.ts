import { Profile } from '../models/profile';

export const loadActiveProfile = (): string | null => {
  return localStorage.getItem('activeProfile');
}

export const saveActiveProfile = (profileKey: string): void => {
  localStorage.setItem('activeProfile', profileKey);
}

export const saveProfileState = (profileKey: string, state: Profile): void => {
  localStorage.setItem(`profile_${profileKey}`, JSON.stringify(state));
}

export const loadProfileState = (profileKey: string): Profile => {
  const storedState = localStorage.getItem(`profile_${profileKey}`);
  return storedState ? JSON.parse(storedState) : {};
}

export const addProfile = (profileKey: string): void => {
  const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
  if (!profiles.includes(profileKey)) {
    profiles.push(profileKey);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    localStorage.setItem(`profile_${profileKey}`, JSON.stringify({}));
  }
}

export const loadProfiles = (): string[] => {
  return JSON.parse(localStorage.getItem('profiles') || '[]');
}

export const saveProfiles = (profiles: string[]) => {
  localStorage.setItem('profiles', JSON.stringify(profiles));
}