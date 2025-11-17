import { useEffect, useRef, useState, useCallback } from "react";

interface AnimationLoopOptions {
  onFrame?: (time: number, deltaTime: number) => void;
  fps?: number;
  loop?: boolean;
  duration?: number;
  autoStart?: boolean;
}

interface AnimationLoopReturn {
  time: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  speed: number;
}

/**
 * useAnimationLoop Hook
 *
 * Manages a requestAnimationFrame loop with:
 * - play / pause
 * - adjustable speed
 * - optional maximum duration
 * - onFrame callback
 */
export function useAnimationLoop(
  options: AnimationLoopOptions = {}
): AnimationLoopReturn {
  const {
    onFrame,
    fps = 60,
    loop = true,
    duration,
    autoStart = false
  } = options;

  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [speed, setSpeed] = useState(1);

  const frameIdRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef<number>(0);

  const targetFrameMs = 1000 / fps;

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    accumulatedTimeRef.current = 0;
    lastTimestampRef.current = null;
    setTime(0);
  }, []);

  const setSpeedSafe = useCallback((newSpeed: number) => {
    // Clamp to a reasonable range
    const clamped = Math.max(0.1, Math.min(4, newSpeed));
    setSpeed(clamped);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (frameIdRef.current != null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      lastTimestampRef.current = null;
      return;
    }

    const frame = (timestamp: number) => {
      if (lastTimestampRef.current == null) {
        lastTimestampRef.current = timestamp;
      }

      const dtMs = timestamp - lastTimestampRef.current;

      // Only update if enough time has passed for desired FPS
      if (dtMs >= targetFrameMs) {
        const dtSec = (dtMs / 1000) * speed;
        lastTimestampRef.current = timestamp;

        let newTime = accumulatedTimeRef.current + dtSec;

        if (duration !== undefined) {
          if (newTime >= duration) {
            if (loop) {
              newTime = newTime % duration;
            } else {
              newTime = duration;
              accumulatedTimeRef.current = newTime;
              setTime(newTime);
              if (onFrame) {
                onFrame(newTime, dtSec);
              }
              setIsPlaying(false);
              return;
            }
          }
        }

        accumulatedTimeRef.current = newTime;
        setTime(newTime);

        if (onFrame) {
          onFrame(newTime, dtSec);
        }
      }

      frameIdRef.current = requestAnimationFrame(frame);
    };

    frameIdRef.current = requestAnimationFrame(frame);

    return () => {
      if (frameIdRef.current != null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };
  }, [isPlaying, speed, duration, loop, targetFrameMs, onFrame]);

  return {
    time,
    isPlaying,
    play,
    pause,
    reset,
    setSpeed: setSpeedSafe,
    speed
  };
}
