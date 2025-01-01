import React from 'react';
import { useDrop } from 'react-dnd';
import { useEvents } from '../context/EventContext';
import { toast } from '../components/ui/use-toast';

function DroppableDay({ date, children }) {
  const { moveEvent } = useEvents();
  const [{ isOver }, drop] = useDrop({
    accept: 'EVENT',
    drop: (item) => {
      if (item.date !== date.toDateString()) {
        try {
          moveEvent(item.id, item.date, date.toDateString());
          toast({
            title: 'Event moved successfully',
            duration: 3000,
          });
        } catch (error) {
          toast({
            title: 'Error moving event',
            description: error.message,
            variant: 'destructive',
            duration: 3000,
          });
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`h-full w-full ${isOver ? 'bg-gray-100' : ''}`}
    >
      {children}
    </div>
  );
}

export default DroppableDay;