import React from 'react';
import { useEvents } from '../context/EventContext';
import DraggableEvent from './DraggableEvent';
import DroppableDay from './DroppableDay';

function CalendarGrid({ currentDate, selectedDate, onDateClick, onEditEvent }) {
  const { events, deleteEvent } = useEvents();
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const renderDays = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];
    const today = new Date();

    // Previous month's days
    const prevMonthDays = startingDay;
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonthLastDay - i);
      days.push(renderDay(date, true));
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push(renderDay(date, false));
    }

    // Next month's days
    const remainingDays = 42 - days.length;
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
      days.push(renderDay(date, true));
    }

    return days;
  };

  const renderDay = (date, isOutsideMonth) => {
    const dateStr = date.toDateString();
    const dayEvents = events[dateStr] || [];
    const isToday = new Date().toDateString() === dateStr;
    const isSelected = selectedDate?.toDateString() === dateStr;

    return (
      <div
        key={dateStr}
        className={`
          min-h-[80px] p-1 border relative
          ${isOutsideMonth ? 'bg-gray-50' : 'bg-white'}
          ${isToday ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}
          ${isSelected ? 'ring-2 ring-blue-500' : ''}
        `}
        onClick={() => onDateClick(date)}
      >
        <div className={`
          text-xs font-medium
          ${isOutsideMonth ? 'text-gray-400' : 'text-gray-900'}
          ${isToday ? 'text-blue-600' : ''}
        `}>
          {date.getDate()}
        </div>
        <DroppableDay date={date}>
          <div className="space-y-1 overflow-y-auto max-h-[60px] text-xs">
            {dayEvents.slice(0, 3).map((event) => (
              <DraggableEvent
                key={event.id}
                event={event}
                onDelete={deleteEvent}
                onEdit={onEditEvent}
              />
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 pl-1">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </DroppableDay>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div
          key={day}
          className="p-1 text-xs font-semibold text-center text-gray-700 bg-white"
        >
          {day}
        </div>
      ))}
      {renderDays()}
    </div>
  );
}

export default CalendarGrid;