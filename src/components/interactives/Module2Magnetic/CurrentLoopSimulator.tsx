import React, { useMemo, useState } from "react";
import { magneticFieldLoop } from "../../../physics/module2Magnetic";
import Canvas2D from "../../shared/Canvas2D";
import ControlPanel from "../../shared/ControlPanel";
import { ParameterConfig } from "../../../types";

const CurrentLoopSimulator: React.FC = () => {
  const [values, setValues] = useState<Record<string, number>>({ current: 2, radius: 0.5 });

  const parameters: ParameterConfig[] = [
    {
      id: "current",
      label: "Current (A)",
      type: "slider",
      default: 2,
      min: 0,
      max: 5,
      step: 0.1,
      description: "Loop current"
    },
    {
      id: "radius",
      label: "Radius (m)",
      type: "slider",
      default: 0.5,
      min: 0.1,
      max: 1,
      step: 0.05,
      description: "Loop radius"
    }
  ];

  const fieldTesla = useMemo(
    () => magneticFieldLoop(values.current, values.radius),
    [values.current, values.radius]
  );

  return (
    <div className="space-y-4 rounded-lg border border-cyan-400/30 bg-cyan-500/5 p-4 text-sm text-cyan-50">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-cyan-100">Current Loop Simulator</h3>
          <p className="text-xs text-cyan-100/80">Center field strength using the Biot–Savart approximation.</p>
        </div>
        <div className="rounded bg-cyan-900/40 px-3 py-1 text-xs font-semibold">
          B ≈ {fieldTesla.toExponential(2)} T
        </div>
      </div>

      <Canvas2D
        draw={(ctx, { width, height }) => {
          ctx.strokeStyle = "#22d3ee";
          ctx.lineWidth = 2;
          const cx = width / 2;
          const cy = height / 2;
          const radiusPx = Math.min(width, height) * 0.25;
          ctx.beginPath();
          ctx.arc(cx, cy, radiusPx, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = "#38bdf8";
          ctx.font = "12px Inter";
          ctx.fillText(`${values.current.toFixed(1)} A`, cx - 24, cy - radiusPx - 6);

          // Field arrows
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = cx + Math.cos(angle) * (radiusPx + 12);
            const y = cy + Math.sin(angle) * (radiusPx + 12);
            const dir = angle + Math.PI / 2;
            const endX = x + Math.cos(dir) * 22;
            const endY = y + Math.sin(dir) * 22;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          }
        }}
      />

      <ControlPanel
        parameters={parameters}
        values={values}
        onChange={(id, value) => setValues((prev) => ({ ...prev, [id]: value }))}
      />
    </div>
  );
};

export default CurrentLoopSimulator;
