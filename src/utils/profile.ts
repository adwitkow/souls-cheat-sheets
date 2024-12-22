import { Profile } from '../models/profile';

function getActiveProfile(): string | null {
  return localStorage.getItem('activeProfile');
}

function setActiveProfile(profileKey: string): void {
  localStorage.setItem('activeProfile', profileKey);
}

function saveProfileState(profileKey: string, state: Profile): void {
  localStorage.setItem(`profile_${profileKey}`, JSON.stringify(state));
}

function loadProfileState(profileKey: string): Profile {
  const storedState = localStorage.getItem(`profile_${profileKey}`);
  return storedState ? JSON.parse(storedState) : {};
}

function addProfile(profileKey: string): void {
  const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
  if (!profiles.includes(profileKey)) {
    profiles.push(profileKey);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    localStorage.setItem(`profile_${profileKey}`, JSON.stringify({}));
  }
}

function getProfiles(): string[] {
  return JSON.parse(localStorage.getItem('profiles') || '[]');
}