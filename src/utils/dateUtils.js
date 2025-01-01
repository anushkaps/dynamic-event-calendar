export function generateCalendarDates(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the first day of the week of the first day of the month
    let start = new Date(firstDay);
    start.setDate(start.getDate() - start.getDay());
    
    // Get the last day of the week of the last day of the month
    let end = new Date(lastDay);
    end.setDate(end.getDate() + (6 - end.getDay()));
    
    const dates = [];
    const current = new Date(start);
    
    while (current <= end) {
      dates.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === month,
        isToday: current.toDateString() === new Date().toDateString(),
      });
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  }
  
  export function formatDate(date) {
    return new Date(date).toLocaleDateString('default', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  export function formatTime(time) {
    return new Date(`2000/01/01 ${time}`).toLocaleTimeString('default', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }