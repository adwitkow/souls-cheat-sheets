const ACTIVE_PROFILE_KEY = 'active-profile';
const PROFILES_KEY = 'profiles';

interface SectionIdentifier {
  profileName: string;
  game: string;
  sectionKey: string;
}

const getFullSectionKey = (section: SectionIdentifier) => {
  return Object.values(section).join('-');
}

const loadActiveProfile = (): string | null => {
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

const saveActiveProfile = (profileName: string) => {
  localStorage.setItem(ACTIVE_PROFILE_KEY, profileName);
}

const saveCheckedSteps = (section: SectionIdentifier, checkedIds: string[]) => {
  const key = getFullSectionKey(section);
  localStorage.setItem(key, JSON.stringify(checkedIds));
}

const loadCheckedSteps = (section: SectionIdentifier): string[] => {
  const key = getFullSectionKey(section);
  const storedState = localStorage.getItem(key);
  return storedState ? JSON.parse(storedState) : [];
}

const loadProfiles = (): string[] => {
  return JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]');
}

const saveProfiles = (profiles: string[]) => {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

const deletePlaythroughs = (profile: string) => {
  Object.keys(localStorage).forEach(key => {
    // this is very naive and needs more validation,
    // perhaps special characters should be forbidden?
    if (key.startsWith(`${profile}-`)) {
      localStorage.removeItem(key);
    }
  })
}

const storageUtils = {
  saveActiveProfile,
  loadActiveProfile,
  saveCheckedSteps,
  loadCheckedSteps,
  loadProfiles,
  saveProfiles,
  deletePlaythroughs,
}

export default storageUtils;