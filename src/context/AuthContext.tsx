import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: 'organizer' | 'faculty' | 'admin';
  phone?: string;
  gstNumber?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (profile: Omit<UserProfile, 'id'>, password?: string) => Promise<boolean>;
  logout: () => void;
  quickLogin: (role: 'director' | 'faculty') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('aurora_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = async (email: string, _password?: string): Promise<boolean> => {
    // Generate/retrieve user profile
    const existing = localStorage.getItem(`aurora_user_${email}`);
    let profile: UserProfile;

    if (existing) {
      profile = JSON.parse(existing);
    } else {
      profile = {
        id: `USR-${Math.floor(100000 + Math.random() * 900000)}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        organization: 'Apex Convention Delegation',
        role: 'organizer',
      };
    }

    setUser(profile);
    localStorage.setItem('aurora_auth_user', JSON.stringify(profile));
    return true;
  };

  const register = async (profileData: Omit<UserProfile, 'id'>, _password?: string): Promise<boolean> => {
    const profile: UserProfile = {
      ...profileData,
      id: `USR-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setUser(profile);
    localStorage.setItem('aurora_auth_user', JSON.stringify(profile));
    localStorage.setItem(`aurora_user_${profile.email}`, JSON.stringify(profile));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aurora_auth_user');
  };

  const quickLogin = (role: 'director' | 'faculty') => {
    const demoUser: UserProfile =
      role === 'director'
        ? {
            id: 'USR-DIR-9812',
            name: 'Dr. Julian Vance',
            email: 'director@worldcongress.org',
            organization: 'International Architecture & Technology Forum',
            role: 'organizer',
            phone: '+91 98450 12345',
            gstNumber: '29ABCDE1234F1Z5',
          }
        : {
            id: 'USR-FAC-4051',
            name: 'Prof. Sandeep Reddy',
            email: 'sandeepssreddy54@gmail.com',
            organization: 'School of Architecture & Hospitality Planning',
            role: 'faculty',
            phone: '+91 98765 43210',
            gstNumber: '36AAAAA0000A1Z5',
          };

    setUser(demoUser);
    localStorage.setItem('aurora_auth_user', JSON.stringify(demoUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        quickLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
