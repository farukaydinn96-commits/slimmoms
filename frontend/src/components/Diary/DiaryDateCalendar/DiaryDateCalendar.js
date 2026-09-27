import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Select date"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        padding: 0,
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="2"
          stroke="#9B9FAA"
          strokeWidth="2"
        />
        <path d="M3 9H21" stroke="#9B9FAA" strokeWidth="2" />
        <path
          d="M8 3V7"
          stroke="#9B9FAA"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 3V7"
          stroke="#9B9FAA"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="8" cy="13" r="1" fill="#9B9FAA" />
        <circle cx="12" cy="13" r="1" fill="#9B9FAA" />
        <circle cx="16" cy="13" r="1" fill="#9B9FAA" />
      </svg>
    </button>
  );
};

const DiaryDateCalendar = ({ selectedDate, onDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      maxDate={new Date()}
      customInput={<CalendarButton />}
    />
  );
};

export default DiaryDateCalendar;
