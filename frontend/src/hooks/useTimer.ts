import { useCallback, useEffect, useState } from "react";

interface UseTimerOptions {
  duration: number;
  onComplete?: () => void;
}

interface UseTimerResult {
  timeRemaining: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: (nextDuration?: number) => void;
}

export function useTimer({ duration, onComplete }: UseTimerOptions): UseTimerResult {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeRemaining((currentTime) => {
        const nextTime = Math.max(currentTime - 1, 0);

        if (nextTime === 0) {
          window.clearInterval(intervalId);
          setIsRunning(false);
          onComplete?.();
        }

        return nextTime;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning, onComplete]);

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
