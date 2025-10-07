import React, { useState } from 'react';
import { MessageCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import Dashboard from './Dashboard';
import DocumentVault from './DocumentVault';
import CommunicationHub from './CommunicationHub';
import ChatInterface from './ChatInterface';
import BrandedHeader from './BrandedHeader';
import BrandedFooter from './BrandedFooter';
import { DashboardProvider } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'communication'>('dashboard');
  const { user } = useAuth();

  if (!user) {
    return null; // This will be handled by App.tsx
  }

  // Create CSS variables for the company theme
  const themeStyles = {
    '--primary-color': user.company.primaryColor,
    '--secondary-color': user.company.secondaryColor,
    '--header-bg': user.company.headerStyle.backgroundColor,
    '--header-text': user.company.headerStyle.textColor,
    '--footer-bg': user.company.footerStyle.backgroundColor,
    '--footer-text': user.company.footerStyle.textColor,
  } as React.CSSProperties;

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col" style={themeStyles}>
        <BrandedHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <main className={`flex-1 mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ${
          isChatOpen ? 'max-w-5xl pr-96' : 'max-w-7xl'
        }`}>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'documents' && <DocumentVault />}
          {activeTab === 'communication' && <CommunicationHub />}
        </main>

        <BrandedFooter />

        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`fixed bottom-6 text-white p-3 shadow-lg transition-all duration-300 z-50 ${
            isChatOpen ? 'right-80 rounded-l-lg' : 'right-6 rounded-full'
          }`}
          style={{
            backgroundColor: user.company.primaryColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${user.company.primaryColor}dd`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = user.company.primaryColor;
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* Chat Panel - Slide from right */}
        <div className={`fixed top-0 right-0 h-full bg-white shadow-xl border-l border-gray-200 transition-transform duration-300 z-40 ${
          isChatOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        } w-80`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Investment Assistant</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsChatExpanded(!isChatExpanded)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {isChatExpanded ? (
                  <Minimize2 className="w-4 h-4 text-gray-500" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-gray-500" />
                )}
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="h-full pb-16">
            <ChatInterface activeTab={activeTab} />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Layout;