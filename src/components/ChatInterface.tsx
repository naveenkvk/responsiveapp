import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! I\'m your investment assistant. I can help you with portfolio insights, performance analysis, and answer questions about your investments. What would you like to know?',
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAssistantResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('portfolio') || message.includes('performance')) {
      return 'Based on your current portfolio, you have a total value of $2.5M with a 15.8% total return. Your portfolio is well-diversified across Private Equity (40%), Real Estate (30%), Venture Capital (20%), and Hedge Funds (10%). Would you like me to show you specific performance metrics or add a new widget to your dashboard?';
    } else if (message.includes('allocation') || message.includes('diversification')) {
      return 'Your current asset allocation shows a balanced approach with Private Equity as your largest holding at 40%. This allocation aligns well with typical LP strategies for long-term growth. Would you like me to add an asset allocation widget to better visualize this data?';
    } else if (message.includes('transaction') || message.includes('capital call') || message.includes('distribution')) {
      return 'Your recent transactions show a healthy mix of capital calls and distributions. You received a $75,000 distribution from Real Estate Fund II and had capital calls totaling $75,000. I can add a transactions widget to your dashboard for better tracking.';
    } else if (message.includes('widget') || message.includes('dashboard')) {
      return 'I can help you customize your dashboard! You can add widgets for portfolio overview, performance charts, asset allocation, recent transactions, and news feeds. What type of widget would you like to add to your dashboard?';
    } else if (message.includes('risk') || message.includes('volatility')) {
      return 'Your portfolio shows moderate risk with good diversification across asset classes. The 2.3% monthly change indicates healthy growth with manageable volatility. Your Private Equity and Real Estate holdings provide stability, while VC investments add growth potential.';
    } else {
      return 'I\'d be happy to help you with that! I can provide insights about your portfolio performance, asset allocation, recent transactions, or help customize your dashboard with new widgets. What specific aspect of your investments would you like to explore?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const assistantResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: simulateAssistantResponse(inputMessage),
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'assistant' && (
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your investments..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;