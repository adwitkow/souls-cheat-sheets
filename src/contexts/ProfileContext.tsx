import React, { createContext, useState, ReactNode, useContext } from 'react';
import { loadActiveProfile, loadProfiles, saveProfiles, saveActiveProfile } from '../utils/profile';

type ProfileContextType = {
  profiles: string[];
  activeProfile: string;
  setActiveProfile: (profile: string) => void;
  addProfile: (profile: string) => void;
};

const initActiveProfile = (): string => {
  let storedActiveProfile = loadActiveProfile();

  if (!storedActiveProfile) {
    storedActiveProfile = 'Default';
    saveActiveProfile(storedActiveProfile);
    saveProfiles([storedActiveProfile]);
  }

  return storedActiveProfile;
}

const ProfileContext = createContext<ProfileContextType>({
  profiles: [],
  activeProfile: '',
  setActiveProfile: () => { },
  addProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [activeProfile, setActiveProfile] = useState<string>(() => initActiveProfile());
  const [profiles, setProfiles] = useState<string[]>(() => loadProfiles());

  console.log(localStorage);

  const addProfile = (profile: string) => {
    if (!profiles.includes(profile)) {
      setProfiles(prevProfiles => [...prevProfiles, profile]);
      saveProfiles(profiles);
    }
  }

  return (
    <ProfileContext.Provider value={{ profiles, activeProfile, setActiveProfile, addProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};