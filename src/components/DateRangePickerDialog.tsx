import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
//
import DateRangePicker from './DateRangePicker';
import { DateRange, DefinedRange } from '../types';

export interface DateRangePickerDialogProps {
  open: boolean;
  toggle: () => void;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange: (dateRange: DateRange) => void;
  closeOnClickOutside?: boolean;
}

export default function DateRangePickerDialog(props: DateRangePickerDialogProps) {
  return <Dialog
    maxWidth='md' fullWidth
    open={props.open} onClose={props.closeOnClickOutside ? () => props.toggle() : undefined}
  >
    <DialogTitle>select a date range</DialogTitle>
    <DialogContent>
      <DateRangePicker {...props} />
    </DialogContent>
    <DialogActions>
      <Button onClick={props.toggle}>close</Button>
      {/* <Button onClick={onClose}>Subscribe</Button> */}
    </DialogActions>
  </Dialog>
}
