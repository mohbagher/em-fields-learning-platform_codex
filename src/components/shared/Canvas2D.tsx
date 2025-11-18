import React, { useEffect, useRef } from "react";

interface Canvas2DProps {
  /** Called after mount/update with a 2D context and canvas size. */
  draw?: (ctx: CanvasRenderingContext2D, dims: { width: number; height: number }) => void;
  /** Optional background fill color. */
  background?: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Lightweight 2D canvas wrapper with a drawing callback.
 * Provides a consistent styled container used across interactives.
 */
const Canvas2D: React.FC<Canvas2DProps> = ({
  draw,
  width = 640,
  height = 320,
  background = "#0f172a",
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Clear and paint background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    // Lightweight grid for context
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += width / 8) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += height / 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (draw) {
      draw(ctx, { width, height });
    }
  }, [background, draw, height, width]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full rounded-lg ring-1 ring-emerald-600/30 ${className}`}
      aria-label="2D visualization canvas"
    />
  );
};

export default Canvas2D;
