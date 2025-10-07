import React from 'react';
import { BarChart3, FileText, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface BrandedHeaderProps {
  activeTab: 'dashboard' | 'documents' | 'communication';
  onTabChange: (tab: 'dashboard' | 'documents' | 'communication') => void;
}

const BrandedHeader: React.FC<BrandedHeaderProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const { company } = user;
  const headerStyle = {
    backgroundColor: company.headerStyle.backgroundColor,
    color: company.headerStyle.textColor,
    borderBottomColor: company.headerStyle.borderColor,
  };

  const getTabStyle = (isActive: boolean) => {
    if (isActive) {
      return {
        backgroundColor: `${company.primaryColor}20`,
        color: company.headerStyle.textColor,
        borderColor: company.primaryColor,
      };
    }
    return {
      color: `${company.headerStyle.textColor}80`,
    };
  };

  const getTabHoverStyle = () => ({
    '&:hover': {
      backgroundColor: `${company.primaryColor}10`,
      color: company.headerStyle.textColor,
    },
  });

  return (
    <header 
      className="shadow-sm border-b"
      style={headerStyle}
    >
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {/* Company Logo and Name */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{company.logo}</div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: company.headerStyle.textColor }}>
                  {company.displayName}
                </h1>
                <p className="text-xs opacity-75">LP Investment Portal</p>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => onTabChange('dashboard')}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent"
                style={getTabStyle(activeTab === 'dashboard')}
                onMouseEnter={(e) => {
                  if (activeTab !== 'dashboard') {
                    e.currentTarget.style.backgroundColor = `${company.primaryColor}10`;
                    e.currentTarget.style.color = company.headerStyle.textColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'dashboard') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = `${company.headerStyle.textColor}80`;
                  }
                }}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={() => onTabChange('documents')}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent"
                style={getTabStyle(activeTab === 'documents')}
                onMouseEnter={(e) => {
                  if (activeTab !== 'documents') {
                    e.currentTarget.style.backgroundColor = `${company.primaryColor}10`;
                    e.currentTarget.style.color = company.headerStyle.textColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'documents') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = `${company.headerStyle.textColor}80`;
                  }
                }}
              >
                <FileText className="w-4 h-4" />
                <span>Document Vault</span>
              </button>

              <button
                onClick={() => onTabChange('communication')}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent"
                style={getTabStyle(activeTab === 'communication')}
                onMouseEnter={(e) => {
                  if (activeTab !== 'communication') {
                    e.currentTarget.style.backgroundColor = `${company.primaryColor}10`;
                    e.currentTarget.style.color = company.headerStyle.textColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'communication') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = `${company.headerStyle.textColor}80`;
                  }
                }}
              >
                <Users className="w-4 h-4" />
                <span>Communication Hub</span>
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Mobile Navigation */}
            <div className="md:hidden flex space-x-2">
              <button
                onClick={() => onTabChange('dashboard')}
                className="p-2 rounded-lg transition-colors border border-transparent"
                style={getTabStyle(activeTab === 'dashboard')}
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => onTabChange('documents')}
                className="p-2 rounded-lg transition-colors border border-transparent"
                style={getTabStyle(activeTab === 'documents')}
              >
                <FileText className="w-5 h-5" />
              </button>

              <button
                onClick={() => onTabChange('communication')}
                className="p-2 rounded-lg transition-colors border border-transparent"
                style={getTabStyle(activeTab === 'communication')}
              >
                <Users className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ 
                    backgroundColor: company.primaryColor, 
                    color: company.secondaryColor 
                  }}
                >
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium" style={{ color: company.headerStyle.textColor }}>
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs opacity-75">{user.role}</div>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="p-2 rounded-lg transition-colors opacity-75 hover:opacity-100"
                style={{ color: company.headerStyle.textColor }}
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BrandedHeader;