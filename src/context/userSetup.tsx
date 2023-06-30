import {createContext, useContext} from 'react';

export type UserSetupContextProps = {
  goal: string;
  age: number;
  height: string;
  weight: string;
  allergies: string[];
};

export type UserSetupContextType = {
  userSetup: UserSetupContextProps;
  setUserSetup: (setup: UserSetupContextProps) => void;
};

export const UserSetupContext = createContext<UserSetupContextType | undefined>(undefined);

export const useUserSetupContext = (): UserSetupContextType => {
  const context = useContext(UserSetupContext);
  if (!context) {
    throw new Error('useUserSetupContext must be used within a UserSetupContextProvider');
  }
  return context;
};
