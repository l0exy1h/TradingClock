import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useGetClockConfigFromURL, useGetClockData } from "./utils";

const clockSize = 233;

export default function Clock() {
  const clockConfig = useGetClockConfigFromURL();
  const clockData = useGetClockData(clockConfig);

  if (clockData === undefined) return <></>;

  const color = clockData.isWaiting ? "primary" : "warning";
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={clockData.percentageOfCurrentInterval}
        size={clockSize}
        sx={{zIndex: 1}}
        color={color}
      />

      <CircularProgress
        variant="determinate"
        size={clockSize}
        sx={(theme) => ({
          color: theme.palette.grey[200],
          ...theme.applyStyles('dark', {
            color: theme.palette.grey[800],
          }),
          position: "absolute",
        })}
        thickness={4}
        value={100}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack alignItems="center">
          <Typography
            variant="h4"
            color={color}
          >
            {clockData.timeToEndOfIntervalStr}
          </Typography>
          <Typography
            variant="caption"
            color="text.primary"
          >
            {clockData.currentTimeLocaleStr}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
