import React from 'react';
import Calendar from './components/Calendar';
import { EventProvider } from './context/EventContext';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <EventProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dynamic Event Calendar</h1>
          <Calendar />
        </div>
      </div>
      <Toaster />
    </EventProvider>
  );
}

export default App;