import React, { useRef, useEffect, useState } from "react";
import MathFunction from "../utils/MathFunction";

import { CanvasData, drawAxis, drawFunction, drawFunctionGrid } from "../utils/Graph";
import Pos from "../utils/Pos";

interface CanvasProps {
  functions: MathFunction[];
}

export default function Canvas({ functions }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize] = useState([
    window.innerWidth,
    window.innerHeight - 10,
  ]);
  const [scale, setScale] = useState(100);
  const [moveOffset, setMoveOffset] = useState({ x: 0, y: 0 });
  const [lastClickPos, setLastClickPos] = useState<Pos | undefined>(undefined);

  function handleResize() {
    setCanvasSize([window.innerWidth, window.innerHeight - 10]);
  }

  function handleWheel(e: React.WheelEvent<HTMLCanvasElement>) {
    if (e.deltaY === 0) return;

    const actualPos = {
        x: e.clientX - canvasSize[0] / 2,
        y: canvasSize[1] / 2 - e.clientY,
      },
      xs = (actualPos.x - moveOffset.x) / scale,
      ys = (actualPos.y - moveOffset.y) / scale;

    const factor = 1 + (e.deltaY > 0 ? -0.05 : 0.05);
    setScale(Math.max(20, scale * factor));

    const offset = {
      x: actualPos.x - xs * (scale * factor),
      y: actualPos.y - ys * (scale * factor),
    };

    setMoveOffset(offset);
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setLastClickPos({ x: e.screenX, y: e.screenY });
  }

  function handleMouseUp() {
    setLastClickPos(undefined);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (lastClickPos === undefined) return;

    setMoveOffset({
      x: moveOffset.x + e.movementX * 1.4,
      y: moveOffset.y - e.movementY * 1.4,
    });
  }

  function handleTouchStart(e: React.TouchEvent<HTMLCanvasElement>) {
    setLastClickPos({ x: e.touches[0].screenX, y: e.touches[0].screenY });
  }

  function handleTouchMove(e: React.TouchEvent<HTMLCanvasElement>) {
    if (lastClickPos === undefined) return;

    const touchPos = {
      x: e.touches[0].screenX,
      y: e.touches[0].screenY,
    };

    const deltaPos = {
      x: lastClickPos.x - touchPos.x,
      y: lastClickPos.y - touchPos.y,
    };

    setMoveOffset({
      x: moveOffset.x - deltaPos.x,
      y: moveOffset.y + deltaPos.y,
    });

    setLastClickPos(touchPos);
  }

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;

    ctx.clearRect(0, 0, canvasSize[0], canvasSize[1]);
    ctx.beginPath();

    const canvasData: CanvasData = {
      ctx,
      width: canvasSize[0],
      height: canvasSize[1],
      offset: moveOffset,
      scale: scale,
    };

    drawAxis(canvasData);
    for (const f of functions) {
      if (f.rawBody.startsWith("y"))
        drawFunction(canvasData, f);
      else 
        drawFunctionGrid(canvasData, f);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, scale, moveOffset, canvasSize, functions]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize[0]}
      height={canvasSize[1]}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    />
  );
}
