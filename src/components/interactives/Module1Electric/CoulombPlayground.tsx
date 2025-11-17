import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  coulombForceVector,
  electricFieldAtPoint,
  generateFieldLine
} from "../../../physics/module1Electric";
import { PointCharge, Vector3D } from "../../../types";
import ToggleSwitch from "../../shared/ToggleSwitch";

/**
 * Interactive illustrating Coulomb's law with draggable charges.
 * TODO: Add drag/drop and UI controls for charge magnitude.
 */
const CoulombPlayground: React.FC = () => {
  const [charges, setCharges] = useState<PointCharge[]>([
    { q: 1, position: { x: -1, y: 0, z: 0 } },
    { q: -1, position: { x: 1, y: 0, z: 0 } }
  ]);
  const [showFieldLines, setShowFieldLines] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const bounds = useMemo(
    () => ({ xMin: -3, xMax: 3, yMin: -2, yMax: 2 }),
    []
  );

  /**
   * Simple helper to move a charge (for future drag interactions)
   */
  const updateChargePosition = (index: number, position: Vector3D) => {
    setCharges((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], position };
      return next;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 640;
    canvas.height = 400;

    const toCanvasX = (x: number) =>
      ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * canvas.width;
    const toCanvasY = (y: number) =>
      canvas.height -
      ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * canvas.height;

    const clear = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0b172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawGrid = () => {
      ctx.strokeStyle = "#1f2a44";
      ctx.lineWidth = 1;
      const steps = 6;
      for (let i = 0; i <= steps; i++) {
        const x = (canvas.width / steps) * i;
        const y = (canvas.height / steps) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawCharges = () => {
      charges.forEach((charge) => {
        const cx = toCanvasX(charge.position.x);
        const cy = toCanvasY(charge.position.y);
        ctx.beginPath();
        ctx.arc(cx, cy, 10 + Math.abs(charge.q) * 4, 0, Math.PI * 2);
        ctx.fillStyle = charge.q >= 0 ? "#ef4444" : "#3b82f6";
        ctx.fill();
        ctx.fillStyle = "#0b172a";
        ctx.font = "bold 12px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(charge.q > 0 ? "+" : "-", cx, cy);
      });
    };

    const drawFieldSamples = () => {
      const rows = 14;
      const cols = 20;
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
          const x = bounds.xMin + (i / cols) * (bounds.xMax - bounds.xMin);
          const y = bounds.yMin + (j / rows) * (bounds.yMax - bounds.yMin);
          const { field } = electricFieldAtPoint(charges, { x, y, z: 0 });
          const mag = Math.sqrt(field.x * field.x + field.y * field.y);
          if (mag < 1e-3) continue;
          const dirX = field.x / mag;
          const dirY = field.y / mag;

          const startX = toCanvasX(x);
          const startY = toCanvasY(y);
          const arrowLength = 10;
          const endX = startX + dirX * arrowLength;
          const endY = startY - dirY * arrowLength;

          ctx.strokeStyle = "#22d3ee";
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      }
    };

    const drawCanvas = () => {
      clear();
      drawGrid();
      drawFieldSamples();

      // === EXPAND-BLOCK: FIELD-LINES-RENDERING ===
      // If showFieldLines is true, draw electric field lines.
      if (showFieldLines) {
        // For simplicity, start lines around positive charges only.
        const seedsPerCharge = 12;
        const seedRadius = 0.4;

        charges.forEach((charge) => {
          if (charge.q <= 0) {
            return;
          }

          for (let k = 0; k < seedsPerCharge; k++) {
            const angle = (2 * Math.PI * k) / seedsPerCharge;
            const start = {
              x: charge.position.x + seedRadius * Math.cos(angle),
              y: charge.position.y + seedRadius * Math.sin(angle),
              z: 0
            };

            const line = generateFieldLine(
              charges,
              start,
              0.05, // step size
              500 // max steps
            );

            if (line.length < 2) return;

            ctx.beginPath();
            line.forEach((p, index) => {
              const cx = toCanvasX(p.x);
              const cy = toCanvasY(p.y);
              if (index === 0) {
                ctx.moveTo(cx, cy);
              } else {
                ctx.lineTo(cx, cy);
              }
            });
            ctx.strokeStyle = "#22c55e"; // green
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }
      // === END-EXPAND-BLOCK ===

      drawCharges();
    };

    drawCanvas();
  }, [bounds, charges, showFieldLines]);

  const netForceOnFirst = useMemo(() => {
    if (charges.length < 2) return { x: 0, y: 0, z: 0 };
    return charges.slice(1).reduce((acc, other) => {
      const f = coulombForceVector(other, charges[0]);
      return { x: acc.x + f.x, y: acc.y + f.y, z: acc.z + f.z };
    }, { x: 0, y: 0, z: 0 });
  }, [charges]);

  return (
    <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/5 p-4 text-sm text-emerald-50 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-emerald-200">
            Coulomb Playground
          </h3>
          <p className="text-emerald-100/80 text-xs">
            Visualize electric field vectors and field lines between point charges.
          </p>
        </div>
        <ToggleSwitch
          label="Field lines"
          checked={showFieldLines}
          onChange={setShowFieldLines}
          description="Toggle electric field line overlay"
        />
      </div>

      <canvas
        ref={canvasRef}
        className="w-full rounded bg-slate-950 ring-1 ring-emerald-700/30"
        aria-label="Coulomb field visualization"
      />

      <div className="grid grid-cols-2 gap-4 text-xs text-emerald-50">
        <div>
          <h4 className="font-semibold">Charges</h4>
          <ul className="space-y-1">
            {charges.map((charge, index) => (
              <li key={index}>
                q{index + 1}: {charge.q} C at ({charge.position.x.toFixed(2)},
                {" "}
                {charge.position.y.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Net force on q1</h4>
          <p>
            Fx: {netForceOnFirst.x.toExponential(2)} N, Fy:{" "}
            {netForceOnFirst.y.toExponential(2)} N
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoulombPlayground;
