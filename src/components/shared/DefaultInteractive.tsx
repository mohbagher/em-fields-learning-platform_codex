import React from "react";
import GraphWrapper, { GraphPoint } from "./GraphWrapper";
import Canvas2D from "./Canvas2D";

interface DefaultInteractiveProps {
  title: string;
  description: string;
  valueLabel: string;
  value: number | string;
  points?: GraphPoint[];
  accentClass?: string;
}

/**
 * Compact reusable interactive layout used by lightweight demos.
 */
const DefaultInteractive: React.FC<DefaultInteractiveProps> = ({
  title,
  description,
  valueLabel,
  value,
  points = [],
  accentClass = "border-emerald-400/30 bg-emerald-500/5 text-emerald-50"
}) => {
  return (
    <div className={`space-y-3 rounded-lg border p-4 text-sm ${accentClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-xs opacity-80">{description}</p>
        </div>
        <div className="rounded bg-slate-900/50 px-3 py-1 text-xs font-semibold">
          {valueLabel}: {typeof value === "number" ? value.toPrecision(3) : value}
        </div>
      </div>

      <GraphWrapper title="Preview" points={points} className="bg-transparent" />

      <Canvas2D
        draw={(ctx, { width, height }) => {
          ctx.strokeStyle = "#34d399";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, height / 2);
          ctx.lineTo(width, height / 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(width / 2, 0);
          ctx.lineTo(width / 2, height);
          ctx.stroke();
        }}
      />
    </div>
  );
};

export default DefaultInteractive;
