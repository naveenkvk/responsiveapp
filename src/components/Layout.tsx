import React, { useState } from 'react';
import { MessageCircle, X, Maximize2, Minimize2, BarChart3, FileText, Users } from 'lucide-react';
import Dashboard from './Dashboard';
import DocumentVault from './DocumentVault';
import CommunicationHub from './CommunicationHub';
import ChatInterface from './ChatInterface';
import { DashboardProvider } from '../context/DashboardContext';

const Layout: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'communication'>('dashboard');

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold text-gray-900">LP Investment Portal</h1>
                
                {/* Navigation Tabs */}
                <nav className="hidden md:flex space-x-6">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'dashboard'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'documents'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Document Vault</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('communication')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'communication'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
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
                    onClick={() => setActiveTab('dashboard')}
                    className={`p-2 rounded-lg transition-colors ${
                      activeTab === 'dashboard'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`p-2 rounded-lg transition-colors ${
                      activeTab === 'documents'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setActiveTab('communication')}
                    className={`p-2 rounded-lg transition-colors ${
                      activeTab === 'communication'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">JD</span>
                  </div>
                  <span className="text-gray-700 font-medium hidden sm:inline">John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ${
          isChatOpen ? 'max-w-5xl pr-96' : 'max-w-7xl'
        }`}>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'documents' && <DocumentVault />}
          {activeTab === 'communication' && <CommunicationHub />}
        </main>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-6 bg-primary-500 hover:bg-primary-600 text-white p-3 shadow-lg transition-all duration-300 z-50 ${
          isChatOpen ? 'right-80 rounded-l-lg' : 'right-6 rounded-full'
        }`}
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