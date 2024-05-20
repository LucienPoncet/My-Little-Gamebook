import './ExitButton.scss';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function exitButton() {
  return (
    <Stack className="exitButton" direction="row" spacing={1}>
      <IconButton aria-label="HighlightOffIcon" color="primary">
        <HighlightOffIcon />
      </IconButton>
    </Stack>
  );
}
