import { useState, useEffect } from 'react';

interface CurrentDateTimeProps {
  showSeconds?: boolean;
  dateFormat?: 'full' | 'short' | 'numeric';
  className?: string;
}

const getDateOptions = (dateFormat: 'full' | 'short' | 'numeric'): Intl.DateTimeFormatOptions => {
  switch (dateFormat) {
    case 'short':
      return { weekday: 'short', month: 'short', day: 'numeric' };
    case 'numeric':
      return { year: 'numeric', month: 'numeric', day: 'numeric' };
    case 'full':
    default:
      return { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  }
};

export const CurrentDateTime = ({
  showSeconds = true,
  dateFormat = 'full',
  className = ''
}: CurrentDateTimeProps) => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const dateOptions = getDateOptions(dateFormat);
      const formattedDate = now.toLocaleDateString('es-ES', dateOptions);

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        ...(showSeconds && { second: '2-digit' })
      };

      const formattedTime = now.toLocaleTimeString('es-ES', timeOptions);

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    const timeoutId = setTimeout(updateDateTime, 0);
    const interval = setInterval(updateDateTime, showSeconds ? 1000 : 60000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [showSeconds, dateFormat]);

  return (
    <div className={`text-right ${className}`}>
      <p className="text-sm text-gray-600 font-medium">{currentDate}</p>
      <p className="text-xs text-gray-500">{currentTime}</p>
    </div>
  );
};