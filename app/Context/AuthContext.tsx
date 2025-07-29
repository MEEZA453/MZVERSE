'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

import { users, type User } from '../lib/DummyUser';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (id: string, password: string) => boolean;
  logout: () => void;
  profileLink: string;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileLink, setProfileLink] = useState('');
  const router = useRouter();

  // Restore from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedLink = localStorage.getItem('profileLink');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfileLink(storedLink || '/' + parsedUser.id);
    }
  }, []);

  const login = (id: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.id === id && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      const link = '/' + foundUser.id;
      setProfileLink(link);
      localStorage.setItem('user', JSON.stringify(foundUser));
      localStorage.setItem('profileLink', link);

      // Redirect immediately
      router.push(link);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setProfileLink('');
    localStorage.removeItem('user');
    localStorage.removeItem('profileLink');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
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
