import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetClockData } from './utils';

export default function Clock() {
  const clockData = useGetClockData();
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={clockData.percentageOfCurrentInterval}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          {clockData.timeToEndOfIntervalStr}
        </Typography>
      </Box>
    </Box>
  );
}
