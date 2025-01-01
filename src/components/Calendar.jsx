import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import EventModal from './EventModal';
import EventList from './EventList';
import SearchBar from './SearchBar';
import ExportButton from './ExportButton';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <SearchBar />
          <ExportButton />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CalendarHeader 
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <CalendarGrid 
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
            />
          </div>
          <EventList 
            selectedDate={selectedDate}
            onEditEvent={handleEditEvent}
          />
        </div>
        <EventModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          editEvent={editingEvent}
        />
      </div>
    </DndProvider>
  );
}

export default Calendar;