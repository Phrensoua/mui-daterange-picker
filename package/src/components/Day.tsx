/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import * as React from 'react';

import { createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { combine } from '../utils';

const theme = createTheme();
const styles = {
  leftBorderRadius: {
    borderRadius: '50% 0 0 50%',
  },
  rightBorderRadius: {
    borderRadius: '0 50% 50% 0',
  },
  buttonContainer: {
    display: 'flex',
  },
  button: {
    height: 36,
    width: 36,
    padding: 0,
  },
  buttonText: {
    lineHeight: 1.6,
  },
  outlined: {
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  filled: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    backgroundColor: theme.palette.primary.dark,
  },
  highlighted: {
    backgroundColor: theme.palette.action.hover,
  },
  contrast: {
    color: theme.palette.primary.contrastText,
  },
};

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
}

export default function Day({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  filled,
  onClick,
  onHover,
  value,
}: DayProps) {
  return (
    <div
      className={combine(
        styles.buttonContainer,
        startOfRange && styles.leftBorderRadius,
        endOfRange && styles.rightBorderRadius,
        !disabled && highlighted && styles.highlighted,
      )}
    >
      <IconButton
        className={combine(
          styles.button,
          !disabled && outlined && styles.outlined,
          !disabled && filled && styles.filled,
        )}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
      >
        <Typography
          color={!disabled ? 'textPrimary' : 'textSecondary'}
          className={combine(
            styles.buttonText,
            !disabled && filled && styles.contrast,
          )}
          variant="body2"
        >
          {value}
        </Typography>
      </IconButton>
    </div>
  );
}
