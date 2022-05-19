/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import * as React from 'react';
import classNames from 'classnames';

import DateRangePicker from './DateRangePicker';

// eslint-disable-next-line no-unused-vars
import { DateRange, DefinedRange } from '../types';

const styles: { [key: string]: React.CSSProperties } = {
  dateRangePickerContainer: {
    position: 'relative',
  },
  dateRangePicker: {
    position: 'relative',
    zIndex: 1,
  },
  dateRangeBackdrop: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    bottom: 0,
    zIndex: 0,
    right: 0,
    left: 0,
    top: 0,
  },
};

export interface DateRangePickerWrapperProps {
  open: boolean;
  toggle: () => void;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange: (dateRange: DateRange) => void;
  closeOnClickOutside?: boolean;
  wrapperClassName?: string;
}

export default function DateRangePickerWrapper(props: DateRangePickerWrapperProps) {
  const {
    closeOnClickOutside,
    wrapperClassName,
    toggle,
    open,
  } = props;

  const handleToggle = () => {
    if (closeOnClickOutside === false) {
      return;
    }

    toggle();
  };

  const handleKeyPress = (event: any) => event?.key === 'Escape' && handleToggle();

  const wrapperClasses = classNames(styles.dateRangePicker, wrapperClassName);

  return (
    <div style={styles.dateRangePickerContainer}>
      {
        open && (
          <div
            style={styles.dateRangeBackdrop}
            onKeyPress={handleKeyPress}
            onClick={handleToggle}
          />
        )
      }

      <div className={wrapperClasses}>
        <DateRangePicker {...props} />
      </div>
    </div>
  );
}
