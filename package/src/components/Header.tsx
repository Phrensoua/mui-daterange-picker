/* eslint-disable no-unused-vars */
/* eslint-disable radix */

import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  setMonth,
  getMonth,
  setYear,
  getYear,
} from 'date-fns';

const styles = {
  iconContainer: {
    padding: 5,
  },
  icon: {
    padding: 10,
    '&:hover': {
      background: 'none',
    },
  },
};

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

export default function Header({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}: HeaderProps) {
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(date, typeof event.target.value === 'string' ? parseInt(event.target.value) : event.target.value));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, typeof event.target.value === 'string' ? parseInt(event.target.value) : event.target.value));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item style={styles.iconContainer}>
        <IconButton
          style={styles.icon}
          disabled={prevDisabled}
          onClick={onClickPrevious}
        >
          <ChevronLeftIcon color={prevDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
      <Grid item>
        <Select
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={{ disablePortal: true }}
        >
          {MONTHS.map((month, idx) => (
            <MenuItem key={month} value={idx}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item>
        <Select
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
        >
          {generateYears(date, 30).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>

        {/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
      </Grid>
      <Grid item style={styles.iconContainer}>
        <IconButton style={styles.icon} disabled={nextDisabled} onClick={onClickNext}>
          <ChevronRightIcon color={nextDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
