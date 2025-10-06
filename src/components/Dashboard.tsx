import React, { useState, useCallback } from 'react';
import GridLayout from 'react-grid-layout';
import { Widget } from '../types';
import WidgetComponent from './WidgetComponent';
import { Plus, Settings } from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Dashboard: React.FC = () => {
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

  const [isCustomizing, setIsCustomizing] = useState(false);

  const onLayoutChange = useCallback((layout: any[]) => {
    if (!isCustomizing) return;
    
    setWidgets(prevWidgets =>
      prevWidgets.map(widget => {
        const layoutItem = layout.find(item => item.i === widget.id);
        if (layoutItem) {
          return {
            ...widget,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
        return widget;
      })
    );
  }, [isCustomizing]);

  const gridLayout = widgets.map(widget => ({
    i: widget.id,
    x: widget.x,
    y: widget.y,
    w: widget.w,
    h: widget.h,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back! Here's your investment overview.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              isCustomizing
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">{isCustomizing ? 'Done Customizing' : 'Customize Layout'}</span>
            <span className="sm:hidden">{isCustomizing ? 'Done' : 'Customize'}</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Widget</span>
          </button>
        </div>
      </div>

      {isCustomizing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <p className="text-blue-800 text-sm font-medium">
              Customization Mode: Drag widgets to reposition them, resize using the handles in the bottom-right corner.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-6 overflow-hidden">
        <GridLayout
          className="layout"
          layout={gridLayout}
          onLayoutChange={onLayoutChange}
          cols={12}
          rowHeight={60}
          width={1200}
          isDraggable={isCustomizing}
          isResizable={isCustomizing}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          useCSSTransforms={true}
          compactType={null}
          preventCollision={true}
          autoSize={true}
        >
          {widgets.map(widget => (
            <div key={widget.id} className="bg-gray-50 rounded-lg border border-gray-200">
              <WidgetComponent widget={widget} />
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

export default Dashboard;