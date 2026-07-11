import { useEffect, useState } from "react";

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

  function start() {
    if (timeRemaining <= 0 || isRunning) {
      return;
    }

    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset(nextDuration = duration) {
    setIsRunning(false);
    setTimeRemaining(nextDuration);
  }

  return {
    timeRemaining,
    isRunning,
    start,
    stop,
    reset,
  };
}
