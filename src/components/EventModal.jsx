import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useEvents } from '../context/EventContext';
import { toast } from '../components/ui/use-toast';

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

  const { addEvent, updateEvent } = useEvents();

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editEvent ? 'Edit Event' : 'Add Event'} for {selectedDate?.toLocaleDateString()}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('title', { required: true })}
              placeholder="Event Title"
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register('startTime', { required: true })}
              type="time"
              className="w-full"
            />
            <Input
              {...register('endTime', { required: true })}
              type="time"
              className="w-full"
            />
          </div>
          <div>
            <Textarea
              {...register('description')}
              placeholder="Event Description"
              className="w-full h-24"
            />
          </div>
          <div className="flex gap-2">
            {EVENT_COLORS.map(({ label, value }) => (
              <label
                key={value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  {...register('color')}
                  value={value}
                  className="sr-only"
                />
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 
                    ${value === 'blue' ? 'bg-blue-100 border-blue-500' :
                      value === 'green' ? 'bg-green-100 border-green-500' :
                      value === 'red' ? 'bg-red-100 border-red-500' :
                      value === 'purple' ? 'bg-purple-100 border-purple-500' :
                      'bg-yellow-100 border-yellow-500'}
                  `}
                />
                <span className="sr-only">{label}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editEvent ? 'Update' : 'Add'} Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EventModal;