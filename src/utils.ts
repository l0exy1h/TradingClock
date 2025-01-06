import { useEffect, useMemo, useState } from "react";
import { ClockConfig, ClockData, getDefaultClockConfig } from "./models";

export function useGetClockConfigFromURL(): ClockConfig {
  return useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const intervalStr = urlParams.get("interval");
    const offsetStr = urlParams.get("offset");
    if (intervalStr === null || offsetStr === null) {
      return getDefaultClockConfig();
    }

    const interval = parseInt(intervalStr);
    const offset = parseInt(offsetStr);
    if (isNaN(interval) || interval === 0 || isNaN(offset) || offset === 0) {
      return getDefaultClockConfig();
    }

    return {
      interval,
      offset,
    };
  }, [window.location.search]);
}

export function getURLFromClockConfig(config: ClockConfig): string {
  return (
    window.location.origin +
    "?" +
    new URLSearchParams({
      interval: config.interval.toString(),
      offset: config.offset.toString(),
    })
  );
}

export function useGetClockData(config: ClockConfig): ClockData | undefined {
  const [clockData, setClockData] = useState<ClockData | undefined>(undefined);
  useEffect(() => {
    const timerId = setInterval(() => {
      setClockData(getClockData(config));
    }, 1000); // tick every 1 sec
    return () => clearInterval(timerId);
  }, [config.offset, config.interval]);
  return clockData;
}

function getClockData(config: ClockConfig): ClockData {
  const currentTime = Math.floor(Date.now() / 1000); // unix seconds

  const currentTimeLocaleStr = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(
    new Date(),
  );

  const timeToStartOfInterval = currentTime % config.interval;
  const timeToEndOfInterval = timeToStartOfInterval === 0 ? 0 : config.interval - timeToStartOfInterval; // seconds

  const timeToEndOfIntervalMM = String(Math.floor(timeToEndOfInterval / 60)).padStart(2, '0');
  const timeToEndOfIntervalSS = String(timeToEndOfInterval % 60).padStart(2, '0');
  const timeToEndOfIntervalStr = `${timeToEndOfIntervalMM}:${
    timeToEndOfIntervalSS
  }`;

  const isWaiting = timeToEndOfInterval > config.offset;
  const percentageOfCurrentInterval = Math.floor(
    (timeToStartOfInterval / config.interval) * 100,
  );

  return {
    currentTimeLocaleStr,
    timeToEndOfInterval,
    timeToEndOfIntervalStr,
    isWaiting,
    percentageOfCurrentInterval,
  };
}
