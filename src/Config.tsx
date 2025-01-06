import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { getURLFromClockConfig, useGetClockConfigFromURL } from "./utils";
import {
  intervalPresets,
  offsetPresets,
} from "./models";

export default function Config() {
  const config = useGetClockConfigFromURL();
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <FormControl>
        <InputLabel>Interval</InputLabel>
        <Select
          value={config.interval}
          label="Interval"
          onChange={(event) => {
            window.location.href = getURLFromClockConfig({
              ...config,
              interval: event.target.value as number,
            });
          }}
        >
          {intervalPresets.map((p) => (
            <MenuItem key={p.value} value={p.value}>
              {p.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Offset</InputLabel>
        <Select
          value={config.offset}
          label="Offset"
          onChange={(event) => {
            window.location.href = getURLFromClockConfig({
              ...config,
              offset: event.target.value as number,
            });
          }}
        >
          {offsetPresets.map((p) => (
            <MenuItem key={p.value} value={p.value}>
              {p.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
