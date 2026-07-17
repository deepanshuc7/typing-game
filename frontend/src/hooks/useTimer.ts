import { useCallback, useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  duration: number;
  onComplete?: () => void;
  onTick?: (timeRemaining: number) => void;
}

interface UseTimerResult {
  timeRemaining: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: (nextDuration?: number) => void;
}

export function useTimer({ duration, onComplete, onTick }: UseTimerOptions): UseTimerResult {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const timeRemainingRef = useRef(duration);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const nextTime = Math.max(timeRemainingRef.current - 1, 0);

      timeRemainingRef.current = nextTime;
      setTimeRemaining(nextTime);
      onTick?.(nextTime);

      if (nextTime === 0) {
        window.clearInterval(intervalId);
        setIsRunning(false);
        onComplete?.();
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning, onComplete, onTick]);

  const start = useCallback(() => {
    if (timeRemaining <= 0) {
      return;
    }

    setIsRunning((currentlyRunning) => {
      if (currentlyRunning) {
        return currentlyRunning;
      }

      return true;
    });
  }, [timeRemaining]);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (nextDuration = duration) => {
      setIsRunning(false);
      timeRemainingRef.current = nextDuration;
      setTimeRemaining(nextDuration);
    },
    [duration],
  );

  return {
    timeRemaining,
    isRunning,
    start,
    stop,
    reset,
  };
}
