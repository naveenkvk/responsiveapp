import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthContextType, Company } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample companies data
const companies: Company[] = [
  {
    id: 'blackstone',
    name: 'blackstone',
    displayName: 'Blackstone Group',
    logo: '🏛️',
    primaryColor: '#1a1a1a',
    secondaryColor: '#f8f8f8',
    headerStyle: {
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      borderColor: '#333333',
    },
    footerStyle: {
      backgroundColor: '#2d2d2d',
      textColor: '#e5e5e5',
      borderColor: '#444444',
    },
  },
  {
    id: 'apollo',
    name: 'apollo',
    displayName: 'Apollo Global Management',
    logo: '🚀',
    primaryColor: '#0066cc',
    secondaryColor: '#f0f8ff',
    headerStyle: {
      backgroundColor: '#0066cc',
      textColor: '#ffffff',
      borderColor: '#0052a3',
    },
    footerStyle: {
      backgroundColor: '#003d82',
      textColor: '#e6f2ff',
      borderColor: '#0052a3',
    },
  },
];

// Sample users data
const users: (Omit<User, 'company'> & { password: string; companyId: string })[] = [
  {
    id: '1',
    username: 'john.blackstone',
    password: 'password123',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@blackstone.com',
    companyId: 'blackstone',
    role: 'investor',
  },
  {
    id: '2',
    username: 'sarah.apollo',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@apollo.com',
    companyId: 'apollo',
    role: 'investor',
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        const company = companies.find(c => c.id === userData.companyId);
        if (company) {
          setUser({ ...userData, company });
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const company = companies.find(c => c.id === foundUser.companyId);
      if (company) {
        const userWithCompany: User = {
          id: foundUser.id,
          username: foundUser.username,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          companyId: foundUser.companyId,
          company,
          role: foundUser.role,
        };
        
        setUser(userWithCompany);
        localStorage.setItem('user', JSON.stringify(userWithCompany));
        setLoading(false);
        return true;
      }
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export sample credentials for demo purposes
export const DEMO_CREDENTIALS = [
  {
    company: 'Blackstone Group',
    username: 'john.blackstone',
    password: 'password123',
    description: 'Dark theme with professional styling',
  },
  {
    company: 'Apollo Global Management',
    username: 'sarah.apollo',
    password: 'password123',
    description: 'Blue theme with modern styling',
  },
];