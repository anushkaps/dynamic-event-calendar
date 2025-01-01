import React from 'react';
import { useDrag } from 'react-dnd';
import { Trash2, Edit } from 'lucide-react';

function DraggableEvent({ event, onDelete, onEdit }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'EVENT',
    item: { id: event.id, date: event.date },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`
        p-2 rounded-md mb-2 cursor-move group relative
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${event.color === 'blue' ? 'bg-blue-100' :
          event.color === 'green' ? 'bg-green-100' :
          event.color === 'red' ? 'bg-red-100' :
          event.color === 'purple' ? 'bg-purple-100' :
          'bg-yellow-100'}
      `}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium">{event.title}</h4>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(event);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id, event.date);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
      {event.description && (
        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
      )}
    </div>
  );
}

export default DraggableEvent;