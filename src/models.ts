// say interval = 300 (5minutes) and offset = 60 (1minute)
// it means to notify users at 9:30, 9:35, 9:40, 9:45...
// also a secondary/different notification will be played at 9:34, 9:39, 9:44
export type ClockConfig = {
  interval: number; // seconds
  offset: number; // seconds
};

// using the same example from above,
// 9:30 - 9:34 is considered "waiting"
// 9:34 - 9:35 is considered "decision making"
export type ClockData = {
  // timeToEndOfInterval: number; // seconds
  timeToEndOfIntervalStr: string; // MM:SS

  // currentTime: number; // unix seconds
  currentTimeLocaleStr: string; // HH:MM:SS timezone_name

  percentageOfCurrentInterval: number; // [0, 99.9]
  
  isWaiting: boolean;

  //barCount: number // TODO
};

export function getDefaultClockConfig(): ClockConfig {
  return {
    interval: 5 * 60,
    offset: 1 * 60,
  };
}

export type Preset = {
  value: number;
  label: string;
};

export const intervalPresets: Preset[] = [
  {
    value: 1 * 60,
    label: "1min",
  },
  {
    value: 5 * 60,
    label: "5min",
  },
  {
    value: 10 * 60,
    label: "10min",
  },
  {
    value: 15 * 60,
    label: "15min",
  },
  {
    value: 30 * 60,
    label: "30min",
  },
];

export const offsetPresets: Preset[] = [
  {
    value: 15,
    label: "15s",
  },
  {
    value: 1 * 60,
    label: "1min",
  },
  {
    value: 2 * 60,
    label: "2min",
  },
  {
    value: 3 * 60,
    label: "3min",
  },
  {
    value: 5 * 60,
    label: "5min",
  },
];
