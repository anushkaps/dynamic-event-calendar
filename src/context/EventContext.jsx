// src/context/EventContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    const dateStr = event.date;
    const dateEvents = events[dateStr] || [];
    
    // Check for time overlap
    const hasOverlap = dateEvents.some(existingEvent => {
      const newStart = new Date(`2000/01/01 ${event.startTime}`);
      const newEnd = new Date(`2000/01/01 ${event.endTime}`);
      const existingStart = new Date(`2000/01/01 ${existingEvent.startTime}`);
      const existingEnd = new Date(`2000/01/01 ${existingEvent.endTime}`);
      
      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });

    if (hasOverlap) {
      throw new Error('Event overlaps with an existing event');
    }

    setEvents(prev => ({
      ...prev,
      [dateStr]: [...dateEvents, event].sort((a, b) => 
        new Date(`2000/01/01 ${a.startTime}`) - new Date(`2000/01/01 ${b.startTime}`)
      )
    }));
  };

  const updateEvent = (eventId, updatedEvent) => {
    const oldDateStr = Object.keys(events).find(date => 
      events[date].some(e => e.id === eventId)
    );
    
    if (!oldDateStr) return;

    const newDateStr = updatedEvent.date;
    
    // Remove from old date
    const filteredOldEvents = events[oldDateStr].filter(e => e.id !== eventId);
    
    // Add to new date (with overlap check if date changed)
    const targetDateEvents = oldDateStr !== newDateStr ? 
      (events[newDateStr] || []) : 
      filteredOldEvents;

    // Check for overlap, excluding the event being updated
    const hasOverlap = targetDateEvents.some(existingEvent => {
      if (existingEvent.id === eventId) return false;
      
      const newStart = new Date(`2000/01/01 ${updatedEvent.startTime}`);
      const newEnd = new Date(`2000/01/01 ${updatedEvent.endTime}`);
      const existingStart = new Date(`2000/01/01 ${existingEvent.startTime}`);
      const existingEnd = new Date(`2000/01/01 ${existingEvent.endTime}`);
      
      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });

    if (hasOverlap) {
      throw new Error('Event overlaps with an existing event');
    }

    setEvents(prev => {
      const newEvents = { ...prev };
      
      if (oldDateStr !== newDateStr) {
        // Remove from old date
        newEvents[oldDateStr] = filteredOldEvents;
        if (newEvents[oldDateStr].length === 0) {
          delete newEvents[oldDateStr];
        }
        
        // Add to new date
        newEvents[newDateStr] = [...(newEvents[newDateStr] || []), updatedEvent]
          .sort((a, b) => new Date(`2000/01/01 ${a.startTime}`) - new Date(`2000/01/01 ${b.startTime}`));
      } else {
        // Update in place
        newEvents[oldDateStr] = [...filteredOldEvents, updatedEvent]
          .sort((a, b) => new Date(`2000/01/01 ${a.startTime}`) - new Date(`2000/01/01 ${b.startTime}`));
      }
      
      return newEvents;
    });
  };

  const deleteEvent = (eventId, date) => {
    setEvents(prev => {
      const newEvents = { ...prev };
      newEvents[date] = newEvents[date].filter(e => e.id !== eventId);
      if (newEvents[date].length === 0) {
        delete newEvents[date];
      }
      return newEvents;
    });
  };

  const moveEvent = (eventId, oldDate, newDate) => {
    const event = events[oldDate].find(e => e.id === eventId);
    if (!event) return;
    
    const updatedEvent = { ...event, date: newDate };
    updateEvent(eventId, updatedEvent);
  };

  const searchEvents = (keyword) => {
    const results = [];
    Object.entries(events).forEach(([date, dateEvents]) => {
      dateEvents.forEach(event => {
        if (
          event.title.toLowerCase().includes(keyword.toLowerCase()) ||
          event.description?.toLowerCase().includes(keyword.toLowerCase())
        ) {
          results.push({ ...event, date });
        }
      });
    });
    return results;
  };

  return (
    <EventContext.Provider value={{
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      moveEvent,
      searchEvents
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}