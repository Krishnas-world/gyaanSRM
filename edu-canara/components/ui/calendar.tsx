'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CalendarProps = {
  className?: string;
  classNames?: Record<string, string>;
  showOutsideDays?: boolean;
  mode?: 'single' | 'range';
  selected?: Date | null;
  onDayClick?: (date: Date | undefined) => void;
};

function Calendar({
  className,
  classNames = {},
  showOutsideDays = true,
  mode = 'single',
  selected,
  onDayClick,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
  const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - 50 + i); // Generate a range of years

  const generateDays = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const days = [];

    for (let i = 0; i < startOfMonth.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const daysInWeek = 7;
    while (days.length % daysInWeek !== 0) {
      days.push(null);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date | null) => {
    if (date) {
      if (onDayClick) {
        onDayClick(date);
      }
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(currentDate.getFullYear(), parseInt(event.target.value), 1));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(event.target.value), currentDate.getMonth(), 1));
  };

  return (
    <div
      className={cn(
        className,
        '!rounded-base border-2 border-border dark:border-darkBorder bg-main p-3 font-bold shadow-light dark:shadow-dark',
      )}
      {...props}
    >
      <div className={cn('flex justify-center items-center', classNames.caption)}>
        <button
          className={cn(buttonVariants({ variant: 'ghost' }), 'h-7 w-7 bg-transparent p-0', classNames.nav_button_previous)}
          onClick={handlePrevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <select
          value={currentDate.getMonth()}
          onChange={handleMonthChange}
          className={cn('mx-1 text-sm', classNames.month_select)}
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={currentDate.getFullYear()}
          onChange={handleYearChange}
          className={cn('mx-1 text-sm', classNames.year_select)}
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          className={cn(buttonVariants({ variant: 'ghost' }), 'h-7 w-7 bg-transparent p-0', classNames.nav_button_next)}
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className={cn('grid grid-cols-7', classNames.head_row)}>
        {daysOfWeek.map(day => (
          <div key={day} className={cn('text-text rounded-base w-9 font-base text-[0.8rem]', classNames.head_cell)}>
            {day}
          </div>
        ))}
      </div>
      <div className={cn('grid grid-cols-7 gap-1 mt-2', classNames.table)}>
        {generateDays().map((day, index) => (
          <button
            key={index}
            className={cn(
              'h-9 w-9 text-center text-sm p-0 relative',
              {
                'bg-white text-text': day && day.getDate() === new Date().getDate(),
                'text-black opacity-50': !day,
                'rounded-base': selected && day && day.getTime() === selected.getTime(),
                'hover:bg-gray-200': day,
              },
              classNames.day
            )}
            onClick={() => handleDateClick(day)}
            disabled={!day}
          >
            {day ? day.getDate() : ''}
          </button>
        ))}
      </div>
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
