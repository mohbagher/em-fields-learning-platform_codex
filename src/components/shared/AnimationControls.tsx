import React from "react";

export interface AnimationControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  timeSeconds?: number;
  speed?: number;
  onSpeedChange?: (speed: number) => void;
}

/**
 * Transport controls for pausing, playing, and scrubbing simulation timelines.
 */
const AnimationControls: React.FC<AnimationControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  timeSeconds = 0,
  speed = 1,
  onSpeedChange
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-200">
      <button
        className="rounded-md border border-slate-700 px-3 py-1 hover:border-emerald-400 hover:text-emerald-100"
        onClick={isPlaying ? onPause : onPlay}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button
        className="rounded-md border border-slate-700 px-3 py-1 hover:border-emerald-400 hover:text-emerald-100"
        onClick={onReset}
      >
        Reset
      </button>
      <div className="flex items-center gap-2 rounded-md border border-slate-800 px-2 py-1 text-xs text-slate-300">
        <span className="font-mono">t={timeSeconds.toFixed(2)}s</span>
        <label className="flex items-center gap-1">
          <span>Speed</span>
          <input
            type="number"
            value={speed}
            min={0.25}
            max={4}
            step={0.25}
            onChange={(e) => onSpeedChange?.(Number(e.target.value))}
            className="w-16 rounded border border-slate-700 bg-slate-900 px-1 text-xs"
          />
          ×
        </label>
      </div>
    </div>
  );
};

export default AnimationControls;
