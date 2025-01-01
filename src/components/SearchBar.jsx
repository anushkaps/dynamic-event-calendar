import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, X } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { toast } from '../components/ui/use-toast';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { searchEvents } = useEvents();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = searchEvents(searchTerm);
    setSearchResults(results);
    
    if (results.length === 0) {
      toast({
        title: 'No events found',
        description: `No events match "${searchTerm}"`,
        duration: 3000,
      });
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-8"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {searchResults.length > 0 && (
        <div className="mt-4 bg-white rounded-lg shadow-lg p-4 absolute z-10 w-full">
          <h3 className="font-medium mb-2">Search Results</h3>
          <div className="space-y-2">
            {searchResults.map((event) => (
              <div
                key={event.id}
                className="p-2 rounded hover:bg-gray-50"
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()} • {event.startTime} - {event.endTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;