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
  _id:string;
  profile: string;
  handle: string;
  name: string;
  email: string;
  token?: string;
 
   // optional because it may be missing from API
}

interface AuthContextType {
  user: User | null;
  setUserData: (userData: User) => void;
  logout: () => void;
  profileLink: string;
  isLoggedIn: boolean;
  token: string;
  handle : string;
   authorId : string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileLink, setProfileLink] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  // ✅ Load from localStorage on first render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem('profile');
      if (profile) {
        const parsedUser = JSON.parse(profile) as User;
        setUser(parsedUser);
        setProfileLink(parsedUser.handle);
        setToken(parsedUser.token || ''); // ✅ Restore token
      }
    }
  }, []);

  const setUserData = (userData: User) => {
    setUser(userData);
    setToken(userData.token || '');
    const link = '/' + userData.handle;
    setProfileLink(link);
    localStorage.setItem('profile', JSON.stringify(userData));
    localStorage.setItem('profileLink', link);
    router.push(link); // redirect to profile or dashboard
  };

  const logout = () => {
    setUser(null);
    setProfileLink('');
    setToken('');
    localStorage.removeItem('profile');
    localStorage.removeItem('profileLink');
    router.push('/signup');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handle:  user?.handle,
        token,
        authorId: user?._id,
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
