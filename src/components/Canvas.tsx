import React, {useRef, useEffect} from 'react';

function drawAxis(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 1000;
  const canvasHeight = 500;

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;

    drawAxis(ctx, canvasWidth, canvasHeight);
  }, [canvasRef]);

  return <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />;
}
