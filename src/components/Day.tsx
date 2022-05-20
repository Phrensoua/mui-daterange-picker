import React, { CSSProperties } from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const theme = createTheme();
const styles: { [key: string]: CSSProperties } = {
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
    backgroundColor: theme.palette.primary.light,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  highlighted: {
    // backgroundColor: theme.palette.action.hover,
    // borderTopStyle: 'dashed',
    // borderBottomStyle: 'dashed',
    backgroundColor: theme.palette.primary.dark,
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
  return <Box
    style={styles.buttonContainer}
    sx={{
      ...(startOfRange ? styles.leftBorderRadius : {}),
      ...(endOfRange ? styles.rightBorderRadius : {}),
      ...(!disabled && highlighted ? styles.highlighted : {}),
    }}
  >
    <IconButton
      style={styles.button}
      sx={{
        ...(!disabled && outlined ? styles.outlined : {}),
        ...(!disabled && filled ? styles.filled : {}),
      }}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={onHover}
    >
      <Typography
        color={!disabled ? 'textPrimary' : 'textSecondary'}
        style={styles.buttonText}
        sx={!disabled && filled ? styles.contrast : undefined}
        variant='body2'
      >
        {value}
      </Typography>
    </IconButton>
  </Box>
}
