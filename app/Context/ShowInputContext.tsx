'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type ShowInputContextType = {
  showLoginInput: boolean;
  setShowLoginInput: React.Dispatch<React.SetStateAction<boolean>>;
  showSignupInput: boolean;
  setShowSignupInput: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowInputContext = createContext<ShowInputContextType | undefined>(undefined);

export const ShowInputProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLoginInput, setShowLoginInput] = useState(false);
  const [showSignupInput, setShowSignupInput] = useState(false);

  return (
    <ShowInputContext.Provider
      value={{
        showLoginInput,
        setShowLoginInput,
        showSignupInput,
        setShowSignupInput,
      }}
    >
      {children}
    </ShowInputContext.Provider>
  );
};

export const useShowInput = () => {
  const context = useContext(ShowInputContext);
  if (context === undefined) {
    throw new Error('useShowInput must be used within a ShowInputProvider');
  }
  return context;
};
