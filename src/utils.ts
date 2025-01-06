import { useMemo } from 'react';
import { ClockConfig, ClockData } from './models';

// return undefined when errored out
export function useGetClockConfigFromURL(): ClockConfig | undefined {
  return useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const intervalStr = urlParams.get('interval');
    const offsetStr = urlParams.get('offset');
    if (intervalStr === null || offsetStr === null) {
      return undefined;
    }

    const interval = parseInt(intervalStr);
    const offset = parseInt(offsetStr);
    if (isNaN(interval) || interval === 0 || isNaN(offset) || offset === 0) {
      return undefined;
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
    '?' +
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
  const currentTime = new Math.floor(Date.now() / 1000); // unix seconds

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  const currentTimeLocaleStr = new Intl.DateTimeFormat('en-US', options).format(
    new Date()
  );

  const timeToStartOfInterval = currentTime % config.interval;
  const timeToEndOfInterval = config.interval - timeToStartOfInterval; // seconds
  const timeToEndOfIntervalStr = `${Math.floor(timeToEndOfInterval / 60)}:${
    timeToEndOfInterval % 60
  }`;

  const isWaiting = timeToEndOfInterval <= config.offset;
  const percentageOfCurrentInterval = Math.floor(
    (timeToEndOfInterval / config.interval) * 100
  );

  return {
    currentTimeLocaleStr,
    timeToEndOfIntervalStr,
    isWaiting,
    percentageOfCurrentInterval,
  };
}
