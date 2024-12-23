const ACTIVE_PROFILE_KEY = 'active-profile';
const PROFILES_KEY = 'profiles';
const PROFILE_PREFIX = 'profile';

interface SectionIdentifier {
  profileName: string;
  game: string;
  sectionName: string;
}

const getFullSectionKey = (section: SectionIdentifier) => {
  const allComponents = [
    PROFILE_PREFIX,
    section.profileName,
    section.game,
    section.sectionName,
  ]

  return allComponents.join('-');
}

const loadActiveProfile = (): string | null => {
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

const saveActiveProfile = (profileName: string) => {
  localStorage.setItem(ACTIVE_PROFILE_KEY, profileName);
}

const saveCheckedIds = (section: SectionIdentifier, checkedIds: string[]) => {
  const key = getFullSectionKey(section);
  localStorage.setItem(key, JSON.stringify(checkedIds));
}

const loadCheckedIds = (section: SectionIdentifier): string[] => {
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

const storageUtils = {
  saveActiveProfile,
  loadActiveProfile,
  saveCheckedIds,
  loadCheckedIds,
  loadProfiles,
  saveProfiles,
}

export default storageUtils;