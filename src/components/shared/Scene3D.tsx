import React, { useEffect, useRef } from "react";

interface Scene3DProps {
  /** Optional render callback to draw into the canvas. */
  render?: (ctx: CanvasRenderingContext2D, dims: { width: number; height: number }) => void;
  className?: string;
}

/**
 * Simple 3D scene placeholder rendered on a 2D canvas.
 * We animate a gradient and grid to evoke depth without a WebGL dependency.
 */
const Scene3D: React.FC<Scene3DProps> = ({ render, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 640;
    const height = 260;
    canvas.width = width;
    canvas.height = height;

    let frameId: number;
    const drawFrame = (time: number) => {
      const t = time * 0.0005;
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `rgba(59,130,246,0.3)`);
      gradient.addColorStop(1, `rgba(14,165,233,0.08)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Perspective grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const y = height - i * 18;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let i = 0; i < 16; i++) {
        const x = i * (width / 15);
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(width / 2 + (x - width / 2) * 0.2, height * 0.25);
        ctx.stroke();
      }

      // Hovering sphere representation
      const cx = width / 2 + Math.sin(t) * 120;
      const cy = height * 0.35 + Math.cos(t * 1.3) * 30;
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(236, 72, 153, 0.7)";
      ctx.fill();
      ctx.strokeStyle = "rgba(236, 72, 153, 0.4)";
      ctx.stroke();

      if (render) {
        render(ctx, { width, height });
      }

      frameId = requestAnimationFrame(drawFrame);
    };

    frameId = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(frameId);
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full rounded-lg ring-1 ring-cyan-500/30 bg-slate-950 ${className}`}
      aria-label="3D scene preview"
    />
  );
};

export default Scene3D;
