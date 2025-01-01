// EventSidebar.jsx
import React from 'react';
import { useEvents } from '../context/EventContext';
import { Button } from './ui/button';
import { CalendarDays, Clock, Trash2 } from 'lucide-react';

export function EventSidebar({ selectedDate, onEditEvent, className = "" }) {
  const { events, deleteEvent } = useEvents();
  const selectedDateEvents = selectedDate ? events[selectedDate.toDateString()] || [] : [];

  const formatTime = (time) => {
    return new Date(`2000/01/01 ${time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`w-80 bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="h-5 w-5" />
        <h2 className="font-semibold">Events</h2>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {selectedDateEvents.map((event) => (
          <div
            key={event.id}
            className={`p-3 rounded-lg ${
              event.color === 'blue' ? 'bg-blue-50' :
              event.color === 'green' ? 'bg-green-50' :
              event.color === 'red' ? 'bg-red-50' :
              event.color === 'purple' ? 'bg-purple-50' :
              'bg-yellow-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{event.title}</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditEvent(event)}
                  className="h-8 w-8 p-0"
                >
                  <Clock className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteEvent(event.id, event.date)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </div>
            {event.description && (
              <p className="text-sm text-gray-600 mt-2">{event.description}</p>
            )}
          </div>
        ))}
        {selectedDate && selectedDateEvents.length === 0 && (
          <p className="text-gray-500 text-center py-4">No events for this day</p>
        )}
      </div>
    </div>
  );
}

export default EventSidebar;