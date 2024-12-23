import { Profile } from '../models/profile';

const loadActiveProfile = (): string | null => {
  return localStorage.getItem('activeProfile');
}

const saveActiveProfile = (profileKey: string): void => {
  localStorage.setItem('activeProfile', profileKey);
}

const saveProfileState = (profileKey: string, state: Profile): void => {
  localStorage.setItem(`profile_${profileKey}`, JSON.stringify(state));
}

const loadProfileState = (profileKey: string): Profile => {
  const storedState = localStorage.getItem(`profile_${profileKey}`);
  return storedState ? JSON.parse(storedState) : {};
}

const addProfile = (profileKey: string): void => {
  const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
  if (!profiles.includes(profileKey)) {
    profiles.push(profileKey);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    localStorage.setItem(`profile_${profileKey}`, JSON.stringify({}));
  }
}

const loadProfiles = (): string[] => {
  return JSON.parse(localStorage.getItem('profiles') || '[]');
}

const saveProfiles = (profiles: string[]) => {
  localStorage.setItem('profiles', JSON.stringify(profiles));
}

const storageUtils = {
  loadActiveProfile,
  saveActiveProfile,
  saveProfileState,
  loadProfileState,
  addProfile,
  loadProfiles,
  saveProfiles,
}

export default storageUtils;