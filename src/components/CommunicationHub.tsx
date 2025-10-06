import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreHorizontal, 
  Paperclip, 
  Pin, 
  Archive, 
  Star,
  CheckCircle,
  Clock,
  User,
  Briefcase,
  Shield,
  Bot,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';
import { Contact, Conversation, CommunicationMessage, AITask } from '../types';

const CommunicationHub: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('conv-1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'conversations' | 'ai-assistant' | 'tasks'>('conversations');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample data
  const currentUser = {
    id: 'user-1',
    name: 'John Doe',
    role: 'investor',
    email: 'john.doe@email.com'
  };

  const contacts: Contact[] = [
    {
      id: 'contact-1',
      name: 'Sarah Chen',
      role: 'fund-manager',
      company: 'Tech Growth Fund III',
      email: 'sarah.chen@techgrowth.com',
      phone: '+1-555-0123',
      isOnline: true,
    },
    {
      id: 'contact-2',
      name: 'Michael Rodriguez',
      role: 'investor-relations',
      company: 'Healthcare Fund I',
      email: 'michael.r@healthcarefund.com',
      isOnline: false,
      lastSeen: new Date('2024-01-15T10:30:00Z'),
    },
    {
      id: 'contact-3',
      name: 'Emma Thompson',
      role: 'operations',
      company: 'Real Estate Fund II',
      email: 'emma.t@realestatefund.com',
      isOnline: true,
    },
    {
      id: 'contact-4',
      name: 'David Park',
      role: 'compliance',
      company: 'Venture Fund IV',
      email: 'david.park@venturefund.com',
      isOnline: false,
      lastSeen: new Date('2024-01-14T16:45:00Z'),
    }
  ];

  const messages: CommunicationMessage[] = [
    {
      id: 'msg-1',
      senderId: 'contact-1',
      recipientId: 'user-1',
      message: 'Hi John, I wanted to follow up on the Q4 performance review. The fund has outperformed expectations with a 18.5% return.',
      timestamp: new Date('2024-01-16T09:15:00Z'),
      type: 'text',
      isRead: true,
      metadata: { fundName: 'Tech Growth Fund III' }
    },
    {
      id: 'msg-2',
      senderId: 'user-1',
      recipientId: 'contact-1',
      message: 'That\'s fantastic news, Sarah! Could you send me the detailed breakdown when available?',
      timestamp: new Date('2024-01-16T09:18:00Z'),
      type: 'text',
      isRead: true,
    },
    {
      id: 'msg-3',
      senderId: 'contact-1',
      recipientId: 'user-1',
      message: 'Absolutely! I\'ll have the detailed report ready by tomorrow morning.',
      timestamp: new Date('2024-01-16T09:20:00Z'),
      type: 'text',
      isRead: true,
    },
    {
      id: 'msg-4',
      senderId: 'ai-assistant',
      recipientId: 'user-1',
      message: 'I\'ve scheduled a reminder for tomorrow morning to follow up on the Q4 report from Sarah. Would you like me to also prepare a summary of your other fund performances for comparison?',
      timestamp: new Date('2024-01-16T09:22:00Z'),
      type: 'ai-response',
      isRead: false,
      metadata: { requestType: 'general' }
    }
  ];

  const conversations: Conversation[] = [
    {
      id: 'conv-1',
      participants: [contacts[0]],
      lastMessage: messages[3],
      unreadCount: 1,
      isPinned: false,
      subject: 'Q4 Performance Discussion',
      fundContext: 'Tech Growth Fund III'
    },
    {
      id: 'conv-2',
      participants: [contacts[1]],
      lastMessage: {
        id: 'msg-5',
        senderId: 'contact-2',
        recipientId: 'user-1',
        message: 'Your K-1 forms are ready for review. Please let me know if you need any clarifications.',
        timestamp: new Date('2024-01-15T14:30:00Z'),
        type: 'text',
        isRead: true,
      },
      unreadCount: 0,
      isPinned: true,
      subject: 'Tax Documentation',
      fundContext: 'Healthcare Fund I'
    },
    {
      id: 'conv-3',
      participants: [contacts[2]],
      lastMessage: {
        id: 'msg-6',
        senderId: 'user-1',
        recipientId: 'contact-3',
        message: 'Thanks for the capital call notice. The funds will be transferred by the due date.',
        timestamp: new Date('2024-01-14T11:20:00Z'),
        type: 'text',
        isRead: true,
      },
      unreadCount: 0,
      isPinned: false,
      subject: 'Capital Call Notice',
      fundContext: 'Real Estate Fund II'
    }
  ];

  const aiTasks: AITask[] = [
    {
      id: 'task-1',
      type: 'form-request',
      status: 'completed',
      description: 'Request updated contact information forms',
      requestedBy: 'user-1',
      createdAt: new Date('2024-01-15T10:00:00Z'),
      completedAt: new Date('2024-01-15T10:15:00Z'),
      result: 'Forms sent to your email'
    },
    {
      id: 'task-2',
      type: 'document-retrieval',
      status: 'in-progress',
      description: 'Fetch all Q4 2023 quarterly reports',
      requestedBy: 'user-1',
      createdAt: new Date('2024-01-16T09:30:00Z'),
    },
    {
      id: 'task-3',
      type: 'appointment-scheduling',
      status: 'pending',
      description: 'Schedule quarterly review meeting with Sarah Chen',
      requestedBy: 'user-1',
      createdAt: new Date('2024-01-16T09:35:00Z'),
    }
  ];

  const getRoleIcon = (role: Contact['role']) => {
    switch (role) {
      case 'fund-manager':
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'investor-relations':
        return <User className="w-4 h-4 text-green-600" />;
      case 'operations':
        return <Settings className="w-4 h-4 text-orange-600" />;
      case 'legal':
        return <Shield className="w-4 h-4 text-purple-600" />;
      case 'compliance':
        return <Shield className="w-4 h-4 text-red-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: AITask['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Here you would normally send the message to your backend
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConv ? 
    messages.filter(m => 
      (m.senderId === selectedConv.participants[0].id && m.recipientId === currentUser.id) ||
      (m.senderId === currentUser.id && m.recipientId === selectedConv.participants[0].id) ||
      m.type === 'ai-response'
    ) : [];

  const filteredConversations = conversations.filter(conv =>
    !searchQuery || 
    conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    conv.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.fundContext?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Communication Hub</h2>
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('conversations')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'conversations'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Chats
            </button>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'ai-assistant'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              AI Assistant
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'tasks'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tasks
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'conversations' && (
            <div className="space-y-1 p-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation === conversation.id
                      ? 'bg-primary-50 border border-primary-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {conversation.participants[0].name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {conversation.participants[0].isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">
                            {conversation.participants[0].name}
                          </h3>
                          {conversation.isPinned && <Pin className="w-3 h-3 text-primary-500" />}
                          {getRoleIcon(conversation.participants[0].role)}
                        </div>
                        <p className="text-xs text-gray-600">{conversation.participants[0].company}</p>
                      </div>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-13">
                    <p className="text-sm text-gray-800 font-medium mb-1">{conversation.subject}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {conversation.lastMessage.message}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {conversation.lastMessage.timestamp.toLocaleDateString()}
                      </span>
                      {conversation.fundContext && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {conversation.fundContext}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai-assistant' && (
            <div className="p-4 space-y-4">
              <div className="text-center">
                <Bot className="w-12 h-12 text-primary-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">AI Assistant</h3>
                <p className="text-sm text-gray-600 mb-4">
                  I can help you with common tasks like updating contact info, requesting forms, or scheduling meetings.
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">Request Forms</div>
                      <div className="text-sm text-gray-600">Get tax forms, agreements, or other documents</div>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Schedule Meeting</div>
                      <div className="text-sm text-gray-600">Book time with fund managers or IR team</div>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="font-medium text-gray-900">Update Contact Info</div>
                      <div className="text-sm text-gray-600">Change address, phone, or banking details</div>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Search className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-gray-900">Find Information</div>
                      <div className="text-sm text-gray-600">Search documents or get fund updates</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="p-4 space-y-3">
              {aiTasks.map((task) => (
                <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        {task.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {task.status === 'in-progress' && <Clock className="w-4 h-4 text-blue-600 animate-spin" />}
                      </div>
                      <p className="text-sm font-medium text-gray-900">{task.description}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Created: {task.createdAt.toLocaleDateString()}
                      </p>
                      {task.completedAt && (
                        <p className="text-xs text-green-600 mt-1">
                          Completed: {task.completedAt.toLocaleDateString()}
                        </p>
                      )}
                      {task.result && (
                        <p className="text-xs text-gray-700 mt-1 italic">
                          Result: {task.result}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {selectedConv.participants[0].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {selectedConv.participants[0].isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConv.participants[0].name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{selectedConv.participants[0].company}</span>
                      {getRoleIcon(selectedConv.participants[0].role)}
                      <span className="text-xs text-gray-500">
                        {selectedConv.participants[0].isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversationMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'ai-response'
                        ? 'bg-yellow-50 border border-yellow-200 text-yellow-900'
                        : message.senderId === currentUser.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.type === 'ai-response' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs font-medium text-yellow-800">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationHub;