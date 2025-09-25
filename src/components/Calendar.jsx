import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';

import Calendar from 'react-calendar';
import { toggle } from '../store/toggleSlice';

export default function MyCalendar({data, date, setDate}) {
  const [events, setEvents] = useState([]); 
  const isToggled = useSelector((state) => state.toggle.isToggled);
  useEffect(() => {

    setEvents(data)

  }, []); 
  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log("Selected Date:", newDate.toLocaleDateString('en-CA')); // Log the clicked date
  };
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const currentDate = date.toLocaleDateString('en-CA'); // Keep as YYYY-MM-DD
      // Check if there's any event on this date
      const event = events.find(e => e.date === currentDate);

      if (event) {
         console.log('event',event.date, 'current date', currentDate);

         return (
          <div
  className="relative w-full h-full bg-center bg-no-repeat bg-cover check z-[-1] "
></div>

        );      }
    }
  };
  if (isToggled){
    return (
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={date}
          view="month" 
          tileContent={renderTileContent} 
          className="custom-calendar" 
        />
      </div>
    );
  }
  return null;
 
}
