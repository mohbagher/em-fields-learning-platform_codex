import React, { useMemo, useState } from "react";
import { solenoidInductance } from "../../../physics/module2Magnetic";
import ControlPanel from "../../shared/ControlPanel";
import Canvas2D from "../../shared/Canvas2D";
import { ParameterConfig } from "../../../types";

const CoilDesigner: React.FC = () => {
  const [values, setValues] = useState<Record<string, number>>({ turns: 50, area: 0.002, length: 0.1 });

  const parameters: ParameterConfig[] = [
    { id: "turns", label: "Turns", type: "slider", default: 50, min: 10, max: 150, step: 1 },
    {
      id: "area",
      label: "Area (m²)",
      type: "slider",
      default: 0.002,
      min: 0.0005,
      max: 0.005,
      step: 0.0001
    },
    {
      id: "length",
      label: "Length (m)",
      type: "slider",
      default: 0.1,
      min: 0.05,
      max: 0.25,
      step: 0.01
    }
  ];

  const inductance = useMemo(
    () => solenoidInductance(values.turns, values.area, values.length),
    [values.turns, values.area, values.length]
  );

  return (
    <div className="space-y-4 rounded-lg border border-cyan-400/30 bg-cyan-500/5 p-4 text-sm text-cyan-50">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-cyan-100">Coil Designer</h3>
          <p className="text-xs text-cyan-100/80">Adjust turn count and geometry to see inductance.</p>
        </div>
        <div className="rounded bg-cyan-900/40 px-3 py-1 text-xs font-semibold">L ≈ {inductance.toExponential(2)} H</div>
      </div>

      <Canvas2D
        draw={(ctx, { width, height }) => {
          const centerX = width / 2;
          const centerY = height / 2;
          const coils = Math.round(values.turns / 10);
          ctx.strokeStyle = "#a5f3fc";
          ctx.lineWidth = 2;
          for (let i = 0; i < coils; i++) {
            const radius = 20 + i * 6;
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, radius * 1.4, radius, 0, 0, Math.PI * 2);
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

export default CoilDesigner;
