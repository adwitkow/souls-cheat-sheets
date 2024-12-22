import React, { createContext, useState, ReactNode, useContext } from 'react';

type ProfileContextType = {
  profile: string;
  setProfile: (profile: string) => void;
};

const defaultProfile = 'Default';

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  setProfile: () => { },
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<string>(defaultProfile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};