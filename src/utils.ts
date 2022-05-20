import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  isSameDay,
  isWithinInterval,
  isSameMonth,
  addMonths,
  parse,
  isValid,
  min,
  max,
} from 'date-fns';
//
import { DateRange } from './types';

export const identity = <T>(x: T) => x;

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] => (
  Array.from(
    { length: Math.ceil(array.length / size) },
    (_v, i) => array.slice(i * size, i * size + size),
  )
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const combine = (...args: any[]): string => args.filter(identity).join(' ');

// Date
export function getDaysInMonth(date: Date) {
  const startWeek = startOfWeek(startOfMonth(date));
  const endWeek = endOfWeek(endOfMonth(date));
  const days = [];
  for (let curr = startWeek; isBefore(curr, endWeek);) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
}

export function isStartOfRange({ startDate }: DateRange, day: Date) {
  return (startDate && isSameDay(day, startDate)) as boolean;
}

export function isEndOfRange({ endDate }: DateRange, day: Date) {
  return (endDate && isSameDay(day, endDate)) as boolean;
}

export function inDateRange({ startDate, endDate }: DateRange, day: Date) {
  return (
    startDate
    && endDate
    && (isWithinInterval(day, { start: startDate, end: endDate })
      || isSameDay(day, startDate)
      || isSameDay(day, endDate))
  ) as boolean;
}

export function isRangeSameDay({ startDate, endDate }: DateRange) {
  if (startDate && endDate) {
    return isSameDay(startDate, endDate);
  }
  return false;
}

type Falsy = false | null | undefined | 0 | '';

export function parseOptionalDate(date: Date | string | Falsy, defaultValue: Date) {
  if (date) {
    if (typeof date === 'string') {
      const parsed = parse(date, 'yyyy-MM-dd', new Date());
      if (isValid(parsed)) return parsed;
    }
    else if (typeof date === 'object') return date;
  }
  return defaultValue;
}

export function getValidatedMonths(range: DateRange, minDate: Date, maxDate: Date) {
  const { startDate, endDate } = range;
  if (startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);

    return [newStart, isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd];
  }
  return [startDate, endDate];
}
