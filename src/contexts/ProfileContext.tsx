import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import storageUtils from '../utils/storageUtils';

const DEFAULT: string = 'Default';

type ProfileContextType = {
  profiles: string[];
  activeProfile: string;
  setActiveProfile: (profile: string) => void;
  addProfile: (profile: string) => void;
  renameProfile: (oldName: string, newName: string) => void;
  deleteProfile: (profile: string) => void;
  saveCheckedSteps: (game: string, sectionKey: string, stepKeys: string[]) => void;
  loadCheckedSteps: (game: string, sectionKey: string) => string[];
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
  renameProfile: () => { },
  deleteProfile: () => { },
  saveCheckedSteps: () => { },
  loadCheckedSteps: () => [],
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

  const addProfile = (profile: string) => {
    setProfiles(prev => {
      if (prev.includes(profile)) {
        return prev;
      }

      setActiveProfile(profile);
      return [...prev, profile];
    });
  }

  const renameProfile = (oldName: string, newName: string) => {
    setProfiles(prev => {
      const index = prev.indexOf(oldName);
      if (index === -1) {
        return prev;
      }

      let modifiedProfiles = prev.map(profile => {
        return profile === oldName ? newName : profile;
      })

      setActiveProfile(newName);

      return modifiedProfiles;
    })
  }

  const deleteProfile = (profile: string) => {
    setProfiles(prev => {
      const index = prev.indexOf(profile);
      if (index === -1) {
        return prev;
      }

      let modifiedProfiles = prev.filter(p => p !== profile);

      if (modifiedProfiles.length === 0) {
        modifiedProfiles = [DEFAULT];
      }

      const previousIndex = index > 0 ? index - 1 : 0;
      setActiveProfile(modifiedProfiles[previousIndex]);

      return modifiedProfiles;
    });
  }

  const saveCheckedSteps = (game: string, sectionKey: string, stepKeys: string[]) => {
    const identifier = {
      profileName: activeProfile,
      game: game,
      sectionKey: sectionKey,
    }

    storageUtils.saveCheckedSteps(identifier, stepKeys);
  }

  const loadCheckedSteps = (game: string, sectionKey: string) => {
    const identifier = {
      profileName: activeProfile,
      game: game,
      sectionKey: sectionKey,
    }

    return storageUtils.loadCheckedSteps(identifier);
  }

  return (
    <ProfileContext.Provider value={{
      profiles,
      activeProfile,
      setActiveProfile,
      addProfile,
      renameProfile,
      deleteProfile,
      saveCheckedSteps,
      loadCheckedSteps,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};