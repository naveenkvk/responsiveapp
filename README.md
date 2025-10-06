# LP Investment Portal

A responsive web application designed for Limited Partners (LPs) to manage and track their private investment portfolios.

## Features

### 🎛️ Customizable Dashboard
- **Drag & Drop Interface**: Reposition widgets by enabling customization mode
- **Resizable Widgets**: Adjust widget sizes using corner handles
- **Real-time Layout Updates**: Changes are reflected immediately

### 📊 Investment Widgets
- **Portfolio Overview**: Total value, returns, and monthly performance
- **Performance Chart**: Visual representation of portfolio growth over time
- **Asset Allocation**: Breakdown by investment categories (PE, Real Estate, VC, Hedge Funds)
- **Recent Transactions**: Capital calls, distributions, and other activities

### 💬 AI Investment Assistant
- **Interactive Chat**: Ask questions about your portfolio
- **Smart Responses**: Get insights about performance, allocation, and transactions
- **Widget Suggestions**: Assistant can recommend adding specific widgets based on queries
- **Mobile Optimized**: Responsive chat interface for all devices

### 📱 Responsive Design
- **Mobile First**: Optimized for smartphones and tablets
- **Adaptive Layout**: Grid layout adjusts to different screen sizes
- **Touch Friendly**: Large touch targets for mobile interaction

## Technology Stack

- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive styling
- **React Grid Layout** for drag-and-drop functionality
- **Lucide React** for modern iconography

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
Opens the app at [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

## Usage Guide

### Dashboard Customization
1. Click "Customize Layout" button
2. Drag widgets to reposition them
3. Use corner handles to resize widgets
4. Click "Done Customizing" to save changes

### Using the Chat Assistant
1. Click the message icon in the bottom-right corner
2. Ask questions about your portfolio:
   - "Show me my portfolio performance"
   - "What's my asset allocation?"
   - "Add a performance widget"
3. The assistant will provide insights and suggest dashboard updates

### Widget Types
- **Portfolio Overview**: Key metrics and summary
- **Performance Chart**: Time-series visualization
- **Asset Allocation**: Category breakdown with percentages
- **Recent Transactions**: Latest capital calls and distributions

## Customization

The application is designed to be easily extensible:

### Adding New Widgets
1. Define new widget types in `src/types/index.ts`
2. Add rendering logic in `src/components/WidgetComponent.tsx`
3. Include sample data in `src/components/Dashboard.tsx`

### Styling
- Colors and themes can be customized in `tailwind.config.js`
- Component styles use Tailwind utility classes for consistency

## Architecture

```
src/
├── components/
│   ├── Layout.tsx          # Main application layout
│   ├── Dashboard.tsx       # Grid-based dashboard
│   ├── WidgetComponent.tsx # Individual widget renderer
│   └── ChatInterface.tsx   # AI assistant chat
├── types/
│   └── index.ts           # TypeScript type definitions
└── App.tsx                # Main application component
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Private Investment Portal - All rights reserved.
