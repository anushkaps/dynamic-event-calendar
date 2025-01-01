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
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register('startTime', { required: true })}
              type="time"
            />
            <Input
              {...register('endTime', { required: true })}
              type="time"
            />
          </div>
          <div>
            <Textarea
              {...register('description')}
              placeholder="Event Description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Color
              </label>
              <select
                {...register('color', { required: true })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {EVENT_COLORS.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editEvent ? 'Update Event' : 'Add Event'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default EventModal;
  