import React, { useState } from 'react';
import { MessageCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import Dashboard from './Dashboard';
import ChatInterface from './ChatInterface';

const Layout: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">LP Investment Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <span className="text-gray-700 font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Dashboard />
      </main>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className={`fixed bottom-20 right-6 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 z-40 ${
          isChatExpanded ? 'w-96 h-96' : 'w-80 h-80'
        } md:${isChatExpanded ? 'w-96 h-96' : 'w-80 h-80'} max-md:fixed max-md:inset-4 max-md:bottom-20 max-md:w-auto max-md:h-auto max-md:max-h-96`}>
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
            <ChatInterface />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;