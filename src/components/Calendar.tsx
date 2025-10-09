import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Bell,
  Plus,
  Filter,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { CalendarEvent } from '../types';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample events data
  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Q1 2024 Investor Meeting',
      description: 'Quarterly review of portfolio performance and strategic updates for all fund investors.',
      date: new Date('2024-02-15T14:00:00'),
      endDate: new Date('2024-02-15T16:00:00'),
      type: 'meeting',
      location: 'Virtual Meeting',
      attendees: ['John Smith', 'Sarah Chen', 'Michael Rodriguez', 'Emma Thompson'],
      fundName: 'Tech Growth Fund III',
      isReminder: true,
      reminderTime: 60,
      status: 'confirmed',
      priority: 'high',
      createdBy: 'Sarah Chen',
      url: 'https://zoom.us/j/123456789'
    },
    {
      id: '2',
      title: 'Healthcare Fund I Capital Call',
      description: 'Capital call notice for $2.5M to fund new biotech investment opportunities.',
      date: new Date('2024-02-20T09:00:00'),
      type: 'capital-call',
      fundName: 'Healthcare Fund I',
      isReminder: true,
      reminderTime: 1440, // 24 hours
      status: 'scheduled',
      priority: 'high',
      createdBy: 'Fund Administrator'
    },
    {
      id: '3',
      title: 'Real Estate Fund II Distribution',
      description: 'Quarterly distribution of $1.8M from portfolio company exits and rental income.',
      date: new Date('2024-02-28T10:00:00'),
      type: 'distribution',
      fundName: 'Real Estate Fund II',
      isReminder: true,
      reminderTime: 720, // 12 hours
      status: 'scheduled',
      priority: 'medium',
      createdBy: 'Fund Administrator'
    },
    {
      id: '4',
      title: 'Private Equity Conference 2024',
      description: 'Annual industry conference featuring keynotes, panel discussions, and networking opportunities.',
      date: new Date('2024-03-10T09:00:00'),
      endDate: new Date('2024-03-12T17:00:00'),
      type: 'conference',
      location: 'Grand Hyatt, New York, NY',
      attendees: ['John Smith'],
      isReminder: true,
      reminderTime: 2880, // 48 hours
      status: 'confirmed',
      priority: 'medium',
      createdBy: 'John Smith'
    },
    {
      id: '5',
      title: 'Due Diligence Call - MedTech Startup',
      description: 'Management presentation and Q&A session for potential Series B investment.',
      date: new Date('2024-03-05T11:00:00'),
      endDate: new Date('2024-03-05T12:30:00'),
      type: 'meeting',
      location: 'Virtual Meeting',
      attendees: ['Sarah Chen', 'Investment Team'],
      fundName: 'Healthcare Fund I',
      isReminder: true,
      reminderTime: 30,
      status: 'confirmed',
      priority: 'high',
      createdBy: 'Sarah Chen',
      url: 'https://teams.microsoft.com/l/meetup-join'
    },
    {
      id: '6',
      title: 'Tax Form Deadline - K-1s',
      description: 'Deadline for submitting K-1 tax forms for 2023 tax year.',
      date: new Date('2024-03-15T23:59:00'),
      type: 'deadline',
      isReminder: true,
      reminderTime: 10080, // 7 days
      status: 'scheduled',
      priority: 'high',
      createdBy: 'Tax Department'
    },
    {
      id: '7',
      title: 'ESG Reporting Webinar',
      description: 'Educational webinar on new ESG reporting requirements and compliance standards.',
      date: new Date('2024-03-08T15:00:00'),
      endDate: new Date('2024-03-08T16:00:00'),
      type: 'webinar',
      location: 'Virtual',
      isReminder: true,
      reminderTime: 120,
      status: 'confirmed',
      priority: 'low',
      createdBy: 'Compliance Team',
      url: 'https://webinar.example.com/esg-reporting'
    }
  ];

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-500 border-blue-500 text-blue-700';
      case 'capital-call':
        return 'bg-red-500 border-red-500 text-red-700';
      case 'distribution':
        return 'bg-green-500 border-green-500 text-green-700';
      case 'deadline':
        return 'bg-orange-500 border-orange-500 text-orange-700';
      case 'conference':
        return 'bg-purple-500 border-purple-500 text-purple-700';
      case 'webinar':
        return 'bg-indigo-500 border-indigo-500 text-indigo-700';
      case 'presentation':
        return 'bg-teal-500 border-teal-500 text-teal-700';
      default:
        return 'bg-gray-500 border-gray-500 text-gray-700';
    }
  };

  const getPriorityIcon = (priority: CalendarEvent['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    return sampleEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date && 
             eventDate.getMonth() === targetDate.getMonth() && 
             eventDate.getFullYear() === targetDate.getFullYear();
    });
  };

  const filteredEvents = sampleEvents.filter(event => {
    const matchesType = selectedEventType === 'all' || event.type === selectedEventType;
    const matchesSearch = !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.fundName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const upcomingEvents = filteredEvents
    .filter(event => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleAddReminder = (eventId: string, reminderTime: number) => {
    // In a real app, this would update the backend
    console.log(`Added reminder for event ${eventId} - ${reminderTime} minutes before`);
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2 h-24 bg-gray-50">
        </div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDate(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() && 
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`p-2 h-24 border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          }`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-700' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {events.slice(0, 2).map((event, index) => {
              const colorClass = getEventTypeColor(event.type);
              return (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 ${colorClass.replace('border-', 'bg-').replace('text-', 'text-white bg-opacity-80')}`}
                  title={event.title}
                >
                  {event.title}
                </div>
              );
            })}
            {events.length > 2 && (
              <div className="text-xs text-gray-500">+{events.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Calendar</h2>
          <p className="text-gray-600 mt-1">Manage your investment events, meetings, and deadlines</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, meetings, or funds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Events</option>
              <option value="meeting">Meetings</option>
              <option value="capital-call">Capital Calls</option>
              <option value="distribution">Distributions</option>
              <option value="deadline">Deadlines</option>
              <option value="conference">Conferences</option>
              <option value="webinar">Webinars</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'month' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'week' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-0 border border-gray-200">
              {renderCalendarGrid()}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md cursor-pointer transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 flex-1 mr-2">{event.title}</h4>
                    {getPriorityIcon(event.priority)}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(event.date)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      getEventTypeColor(event.type).replace('border-', 'bg-').replace('text-', 'text-white bg-opacity-80')
                    }`}>
                      {event.type.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {isEventModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      getEventTypeColor(selectedEvent.type).replace('border-', 'bg-').replace('text-', 'text-white bg-opacity-80')
                    }`}>
                      {selectedEvent.type.replace('-', ' ').toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1">
                      {getPriorityIcon(selectedEvent.priority)}
                      <span className="text-sm text-gray-600 capitalize">{selectedEvent.priority} Priority</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEventModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Event Details */}
              <div className="space-y-6">
                {selectedEvent.description && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedEvent.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Event Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CalendarIcon className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">{formatDate(selectedEvent.date)}</p>
                          <p className="text-sm text-gray-600">
                            {formatTime(selectedEvent.date)}
                            {selectedEvent.endDate && ` - ${formatTime(selectedEvent.endDate)}`}
                          </p>
                        </div>
                      </div>

                      {selectedEvent.location && (
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-gray-900">{selectedEvent.location}</p>
                            {selectedEvent.url && (
                              <a 
                                href={selectedEvent.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Join Meeting</span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                        <div className="flex items-start space-x-3">
                          <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">{selectedEvent.attendees.length} Attendees</p>
                            <div className="text-sm text-gray-600">
                              {selectedEvent.attendees.slice(0, 3).join(', ')}
                              {selectedEvent.attendees.length > 3 && ` and ${selectedEvent.attendees.length - 3} others`}
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedEvent.fundName && (
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">F</span>
                          </div>
                          <div>
                            <p className="text-gray-900">{selectedEvent.fundName}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Reminders</h3>
                    <div className="space-y-3">
                      {selectedEvent.isReminder && (
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Bell className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              Reminder set for {selectedEvent.reminderTime} minutes before
                            </p>
                            <p className="text-xs text-blue-700">
                              You'll be notified at {new Date(selectedEvent.date.getTime() - (selectedEvent.reminderTime || 0) * 60000).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {!selectedEvent.isReminder && (
                        <button
                          onClick={() => handleAddReminder(selectedEvent.id, 60)}
                          className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Bell className="w-4 h-4" />
                          <span>Add Reminder</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setIsEventModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  {selectedEvent.url && (
                    <a
                      href={selectedEvent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
                    >
                      Join Event
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;