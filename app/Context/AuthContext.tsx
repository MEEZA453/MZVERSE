'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  profile : string,
  handle : string
  name: string;
  email: string;
  token?: string;
  // Add any other fields your API returns
}

interface AuthContextType {
  user: User | null;
  setUserData: (userData: User) => void;
  logout: () => void;
  profileLink: string;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileLink, setProfileLink] = useState('');
  const router = useRouter();

    useEffect(() => {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem('profile')
      if (profile) {
        const parsedUser = JSON.parse(profile)
        setUser(parsedUser)
        setProfileLink(parsedUser.handle)
      }
    }
  }, [])
  // Load from localStorage on first render


  const setUserData = (userData: User) => {
    setUser(userData);
    const link = '/' + userData.handle;
    setProfileLink(link);
    localStorage.setItem('profile', JSON.stringify(userData));
    localStorage.setItem('profileLink', link);
    router.push(link); // redirect to profile or dashboard
  };

  const logout = () => {
    setUser(null);
    setProfileLink('');
    localStorage.removeItem('profile');
    localStorage.removeItem('profileLink');
    router.push('/signup');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserData,
        logout,
        profileLink,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
