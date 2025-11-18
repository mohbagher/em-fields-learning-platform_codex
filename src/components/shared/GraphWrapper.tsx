import React, { useMemo } from "react";

export interface GraphPoint {
  x: number;
  y: number;
}

interface GraphWrapperProps {
  title?: string;
  unit?: string;
  points?: GraphPoint[];
  className?: string;
  height?: number;
  children?: React.ReactNode;
}

/**
 * Simple, dependency-free line plotter for small data sets.
 */
const GraphWrapper: React.FC<GraphWrapperProps> = ({
  title = "Graph",
  unit,
  points = [],
  className = "",
  height = 180,
  children
}) => {
  const { path, minY, maxY } = useMemo(() => {
    if (points.length === 0) {
      return { path: "", minY: 0, maxY: 1 };
    }
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minYVal = Math.min(...ys);
    const maxYVal = Math.max(...ys);
    const spanX = maxX - minX || 1;
    const spanY = maxYVal - minYVal || 1;

    const svgPoints = points
      .map((p) => {
        const x = ((p.x - minX) / spanX) * 100;
        const y = 100 - ((p.y - minYVal) / spanY) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    return { path: svgPoints, minY: minYVal, maxY: maxYVal };
  }, [points]);

  return (
    <div
      className={`rounded-lg border border-slate-800 bg-slate-900/70 p-4 ${className}`}
      style={{ minHeight: height }}
    >
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-semibold text-white">{title}</h5>
        {unit && <span className="text-xs text-slate-400">{unit}</span>}
      </div>
      <div className="mt-3 min-h-[160px] rounded-md border border-dashed border-emerald-400/30 bg-emerald-400/5" role="img">
        {points.length > 1 ? (
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <polyline
              fill="none"
              stroke="#34d399"
              strokeWidth={2}
              points={path}
              vectorEffect="non-scaling-stroke"
            />
            <text x="4" y="12" className="fill-emerald-100 text-[6px]">
              min {minY.toPrecision(3)} | max {maxY.toPrecision(3)}
            </text>
          </svg>
        ) : (
          children ?? <p className="p-3 text-xs text-emerald-100">Graph placeholder</p>
        )}
      </div>
    </div>
  );
};

export default GraphWrapper;
