import React, { useState, useCallback } from 'react';
import GridLayout from 'react-grid-layout';
import { Widget } from '../types';
import WidgetComponent from './WidgetComponent';
import AddWidgetModal from './AddWidgetModal';
import { Plus, Settings } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Dashboard: React.FC = () => {
  const { widgets, updateWidget } = useDashboard();

  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);

  const onLayoutChange = useCallback((layout: any[]) => {
    if (!isCustomizing) return;
    
    layout.forEach(layoutItem => {
      updateWidget(layoutItem.i, {
        x: layoutItem.x,
        y: layoutItem.y,
        w: layoutItem.w,
        h: layoutItem.h,
      });
    });
  }, [isCustomizing, updateWidget]);

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
          <button 
            onClick={() => setIsAddWidgetModalOpen(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
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
              <WidgetComponent widget={widget} isCustomizing={isCustomizing} />
            </div>
          ))}
        </GridLayout>
      </div>

      {/* Add Widget Modal */}
      <AddWidgetModal
        isOpen={isAddWidgetModalOpen}
        onClose={() => setIsAddWidgetModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;