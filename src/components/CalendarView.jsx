// src/components/CalendarView.jsx
import { format, getDay, parse, startOfWeek } from 'date-fns';
import es from 'date-fns/locale/es';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { es };
const localizer = dateFnsLocalizer({
  format, parse, startOfWeek, getDay, locales,
});

const CalendarView = ({ eventos }) => {
  return (
    <div style={{ height: '500px', margin: '30px auto' }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={{
          today: 'Hoy',
          previous: 'Anterior',
          next: 'Siguiente',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
        }}
      />
    </div>
  );
};

export default CalendarView;
