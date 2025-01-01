import React from 'react';
import { Button } from '../components/ui/button';
import { Download } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { toast } from '../components/ui/use-toast';

function ExportButton() {
  const { events } = useEvents();

  const exportEvents = (format) => {
    try {
      const eventsList = Object.entries(events).flatMap(([date, dateEvents]) =>
        dateEvents.map(event => ({
          ...event,
          date,
        }))
      );

      let content;
      let filename;
      let type;

      if (format === 'json') {
        content = JSON.stringify(eventsList, null, 2);
        filename = 'calendar-events.json';
        type = 'application/json';
      } else {
        // CSV format
        const headers = ['id', 'title', 'date', 'startTime', 'endTime', 'description', 'color'];
        const csvContent = [
          headers.join(','),
          ...eventsList.map(event =>
            headers.map(header => {
              const value = event[header] || '';
              return `"${value.toString().replace(/"/g, '""')}"`
            }).join(',')
          )
        ].join('\n');
        
        content = csvContent;
        filename = 'calendar-events.csv';
        type = 'text/csv';
      }

      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Export successful',
        description: `Events exported as ${format.toUpperCase()}`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => exportEvents('json')}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export JSON
      </Button>
      <Button
        variant="outline"
        onClick={() => exportEvents('csv')}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
    </div>
  );
}

export default ExportButton;