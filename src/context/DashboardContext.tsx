import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Widget, DashboardContextType } from '../types';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'portfolio-1',
      type: 'portfolio-overview',
      title: 'Portfolio Overview',
      x: 0,
      y: 0,
      w: 6,
      h: 4,
      data: {
        totalValue: 2500000,
        totalReturn: 15.8,
        monthlyChange: 2.3
      }
    },
    {
      id: 'performance-1',
      type: 'performance-chart',
      title: 'Performance Chart',
      x: 6,
      y: 0,
      w: 6,
      h: 4,
      data: {
        chartData: [
          { month: 'Jan', value: 2200000 },
          { month: 'Feb', value: 2300000 },
          { month: 'Mar', value: 2250000 },
          { month: 'Apr', value: 2400000 },
          { month: 'May', value: 2500000 },
        ]
      }
    },
    {
      id: 'allocation-1',
      type: 'asset-allocation',
      title: 'Asset Allocation',
      x: 0,
      y: 4,
      w: 4,
      h: 3,
      data: {
        allocations: [
          { category: 'Private Equity', percentage: 40, value: 1000000 },
          { category: 'Real Estate', percentage: 30, value: 750000 },
          { category: 'Venture Capital', percentage: 20, value: 500000 },
          { category: 'Hedge Funds', percentage: 10, value: 250000 },
        ]
      }
    },
    {
      id: 'transactions-1',
      type: 'recent-transactions',
      title: 'Recent Transactions',
      x: 4,
      y: 4,
      w: 8,
      h: 3,
      data: {
        transactions: [
          { date: '2024-01-15', type: 'Capital Call', fund: 'Tech Growth Fund III', amount: -50000 },
          { date: '2024-01-10', type: 'Distribution', fund: 'Real Estate Fund II', amount: 75000 },
          { date: '2024-01-05', type: 'Capital Call', fund: 'Healthcare Fund I', amount: -25000 },
        ]
      }
    }
  ]);

  const findNextPosition = (w: number, h: number): { x: number; y: number } => {
    const cols = 12;
    const maxY = Math.max(0, ...widgets.map(widget => widget.y + widget.h));
    
    for (let y = 0; y <= maxY + 1; y++) {
      for (let x = 0; x <= cols - w; x++) {
        const isPositionFree = !widgets.some(widget => {
          return !(
            x + w <= widget.x ||
            x >= widget.x + widget.w ||
            y + h <= widget.y ||
            y >= widget.y + widget.h
          );
        });
        
        if (isPositionFree) {
          return { x, y };
        }
      }
    }
    
    return { x: 0, y: maxY + 1 };
  };

  const addWidget = (widgetData: Omit<Widget, 'id'>) => {
    const id = `widget-${Date.now()}`;
    const position = findNextPosition(widgetData.w, widgetData.h);
    
    const newWidget: Widget = {
      ...widgetData,
      id,
      x: position.x,
      y: position.y,
    };
    
    setWidgets(prev => [...prev, newWidget]);
    return id;
  };

  const updateWidget = (id: string, updates: Partial<Widget>) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === id ? { ...widget, ...updates } : widget
    ));
  };

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== id));
  };


  const value: DashboardContextType = {
    widgets,
    addWidget,
    updateWidget,
    removeWidget,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};