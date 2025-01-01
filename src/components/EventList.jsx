import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useEvents } from '../context/EventContext';
import { toast } from '../components/ui/use-toast';
import { Clock, CalendarDays } from 'lucide-react';

const EVENT_COLORS = [
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Red', value: 'red' },
  { label: 'Purple', value: 'purple' },
  { label: 'Yellow', value: 'yellow' },
];

function EventModal({ isOpen, onClose, selectedDate, editEvent = null }) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: editEvent || {
      title: '',
      startTime: '',
      endTime: '',
      description: '',
      color: 'blue'
    }
  });

  const { addEvent, updateEvent, events } = useEvents();
  const selectedDateEvents = selectedDate ? events[selectedDate.toDateString()] || [] : [];

  const formatTime = (time) => {
    return new Date(`2000/01/01 ${time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  React.useEffect(() => {
    if (editEvent) {
      Object.entries(editEvent).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [editEvent, setValue]);

  const onSubmit = (data) => {
    try {
      const eventData = {
        ...data,
        id: editEvent?.id || Date.now(),
        date: selectedDate.toDateString(),
      };

      if (editEvent) {
        updateEvent(editEvent.id, eventData);
      } else {
        addEvent(eventData);
      }
      
      reset();
      onClose();
      toast({
        title: `Event ${editEvent ? 'updated' : 'added'} successfully`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            {selectedDate?.toLocaleDateString(undefined, { dateStyle: 'full' })}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register('title', { required: true })} placeholder="Event Title" />
            
            <div className="grid grid-cols-2 gap-4">
              <Input {...register('startTime', { required: true })} type="time" />
              <Input {...register('endTime', { required: true })} type="time" />
            </div>
            
            <Textarea {...register('description')} placeholder="Event Description" />
            
            <select
              {...register('color', { required: true })}
              className="w-full p-2 border rounded-md"
            >
              {EVENT_COLORS.map((color) => (
                <option key={color.value} value={color.value}>{color.label}</option>
              ))}
            </select>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit">{editEvent ? 'Update' : 'Add'} Event</Button>
            </div>
          </form>

          <div className="border-l pl-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Events for this day
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
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
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-600">
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </div>
                  {event.description && (
                    <div className="text-sm mt-1">{event.description}</div>
                  )}
                </div>
              ))}
              {selectedDateEvents.length === 0 && (
                <p className="text-gray-500 text-center py-4">No events scheduled</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EventModal;