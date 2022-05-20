import React from 'react';
import { createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { format, differenceInCalendarMonths } from 'date-fns';
//
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import { DateRange, DefinedRange, Setter, NavigationAction } from '../types';
import { MARKERS } from './DateRangePicker';

const theme = createTheme();
const styles: { [key: string]: React.CSSProperties } = {
  header: {
    padding: '20px 70px',
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    borderLeft: `1px solid ${theme.palette.action.hover}`,
    marginBottom: 20,
  },
};

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

export default function Menu(props: MenuProps) {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };
  return <Paper elevation={5} square>
    <Grid container direction='row' wrap='nowrap'>
      <Grid>
        <Grid container style={styles.header} alignItems='center'>
          <Grid item style={styles.headerItem}>
            <Typography variant='subtitle1'>
              {startDate ? format(startDate, 'MMMM dd, yyyy') : 'Start Date'}
            </Typography>
          </Grid>
          <Grid item style={styles.headerItem}>
            <ArrowRightAltIcon color='action' />
          </Grid>
          <Grid item style={styles.headerItem}>
            <Typography variant='subtitle1'>
              {endDate ? format(endDate, 'MMMM dd, yyyy') : 'End Date'}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container direction='row' justifyContent='center' wrap='nowrap'>
          <Month
            {...commonProps}
            value={firstMonth}
            setValue={setFirstMonth}
            navState={[true, canNavigateCloser]}
            marker={MARKERS.FIRST_MONTH}
          />
          <div style={styles.divider} />
          <Month
            {...commonProps}
            value={secondMonth}
            setValue={setSecondMonth}
            navState={[canNavigateCloser, true]}
            marker={MARKERS.SECOND_MONTH}
          />
        </Grid>
      </Grid>
      <div style={styles.divider} />
      <Grid>
        <DefinedRanges
          selectedRange={dateRange}
          ranges={ranges}
          setRange={setDateRange}
        />
      </Grid>
    </Grid>
  </Paper>
}
