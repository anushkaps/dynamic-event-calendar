import React from 'react';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button variant="outline" onClick={onPrevMonth}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <h2 className="text-xl font-semibold">
        {currentDate.toLocaleDateString('default', { 
          month: 'long',
          year: 'numeric'
        })}
      </h2>
      <Button variant="outline" onClick={onNextMonth}>
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}

export default CalendarHeader;