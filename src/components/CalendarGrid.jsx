import React from 'react';
import { useEvents } from '../context/EventContext';
import { generateCalendarDates } from '../utils/dateUtils';
import DroppableDay from './DroppableDay';

function CalendarGrid({ currentDate, selectedDate, onDateClick }) {
  const { events } = useEvents();
  const dates = generateCalendarDates(currentDate);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {weekdays.map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center font-semibold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {dates.map((item, index) => {
          const dateStr = item.date.toDateString();
          const dateEvents = events[dateStr] || [];
          
          return (
            <DroppableDay key={index} date={item.date}>
              <div
                onClick={() => onDateClick(item.date)}
                className={`
                  bg-white p-2 min-h-[120px] cursor-pointer hover:bg-gray-50
                  ${!item.isCurrentMonth ? 'text-gray-400' : ''}
                  ${dateStr === new Date().toDateString() ? 'bg-blue-50' : ''}
                  ${dateStr === selectedDate?.toDateString() ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.date.getDate()}</span>
                  {dateEvents.length > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
                      {dateEvents.length}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {dateEvents.slice(0, 2).map((event, i) => (
                    <div 
                      key={event.id}
                      className={`
                        text-xs p-1 rounded truncate
                        ${event.color === 'blue' ? 'bg-blue-100' :
                          event.color === 'green' ? 'bg-green-100' :
                          event.color === 'red' ? 'bg-red-100' :
                          event.color === 'purple' ? 'bg-purple-100' :
                          'bg-yellow-100'}
                      `}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dateEvents.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dateEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            </DroppableDay>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;