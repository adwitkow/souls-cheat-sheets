import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import storageUtils from '../utils/storageUtils';

const DEFAULT: string = 'Default';

type ProfileContextType = {
  profiles: string[];
  activeProfile: string;
  setActiveProfile: (profile: string) => void;
  addProfile: (profile: string) => void;
  deleteProfile: (profile: string) => void;
};

const initActiveProfile = (): string => {
  let storedActiveProfile = storageUtils.loadActiveProfile();

  if (!storedActiveProfile) {
    storedActiveProfile = DEFAULT;
    storageUtils.saveActiveProfile(storedActiveProfile);
    storageUtils.saveProfiles([storedActiveProfile]);
  }

  return storedActiveProfile;
}

const ProfileContext = createContext<ProfileContextType>({
  profiles: [],
  activeProfile: '',
  setActiveProfile: () => { },
  addProfile: () => { },
  deleteProfile: () => { },
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [activeProfile, setActiveProfile] = useState<string>(() => initActiveProfile());

  useEffect(() => {
    storageUtils.saveActiveProfile(activeProfile);
  }, [activeProfile])

  const [profiles, setProfiles] = useState<string[]>(() => storageUtils.loadProfiles());

  useEffect(() => {
    storageUtils.saveProfiles(profiles);
  }, [profiles])

  console.log(localStorage);

  const addProfile = (profile: string) => {
    setProfiles(prev => {
      if (prev.includes(profile)) {
        return prev;
      }

      setActiveProfile(profile);
      return [...prev, profile];
    });
  }

  const deleteProfile = (profile: string) => {
    setProfiles(prev => {
      const index = prev.indexOf(profile);
      if (index === -1) {
        return prev;
      }

      let modifiedProfiles = prev.filter(p => p !== profile);
      modifiedProfiles.splice(index, 1);

      if (modifiedProfiles.length === 0) {
        modifiedProfiles = [DEFAULT];
      }

      const previousIndex = index > 0 ? index - 1 : 0;
      setActiveProfile(modifiedProfiles[previousIndex]);

      return modifiedProfiles;
    });
  }

  return (
    <ProfileContext.Provider value={{
      profiles,
      activeProfile,
      setActiveProfile,
      addProfile,
      deleteProfile,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};