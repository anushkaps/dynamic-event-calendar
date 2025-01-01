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
        p-1 rounded text-xs mb-1 cursor-move group relative
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${event.color === 'blue' ? 'bg-blue-100' :
          event.color === 'green' ? 'bg-green-100' :
          event.color === 'red' ? 'bg-red-100' :
          event.color === 'purple' ? 'bg-purple-100' :
          'bg-yellow-100'}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="truncate">{event.title}</div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(event);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id, event.date);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="text-[10px] text-gray-600">{event.startTime}</div>
    </div>
  );
}

export default DraggableEvent;