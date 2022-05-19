import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// eslint-disable-next-line no-unused-vars
import DateRangePickerWrapper, { DateRangePickerWrapperProps } from './DateRangePickerWrapper';
// import generateClassName from '../generateClassName';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const DateRangePickerExporter: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps,
) => (
  <ThemeProvider theme={darkTheme}>
    <DateRangePickerWrapper
      {...props}
    />
  </ThemeProvider>
);

export default DateRangePickerExporter;
