import React, {useRef, useEffect, useState} from 'react';
import * as math from 'mathjs';

import {CanvasData, drawAxis, drawFunction, drawFunctionGrid} from '../utils/Graph';
import Pos from '../utils/Pos';


export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight - 10;

  const [scale, setScale] = useState(100);
  const [moveOffset, setMoveOffset] = useState({x: 0, y: 0});
  const [lastClickPos, setLastClickPos] = useState<Pos | undefined>(undefined);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();

    const canvasData: CanvasData = {
      ctx,
      width: canvasWidth,
      height: canvasHeight,
      offset: moveOffset,
      scale: scale,
    };

    drawAxis(canvasData);
    drawFunction(canvasData, math.compile('tan(x)'));
    //drawFunction(canvasData, math.compile('x^x'));
    //drawFunction(canvasData, math.compile('1 / (1 + e^(-x))'));
  }, [canvasRef, scale, moveOffset, canvasWidth, canvasHeight]);

  function handleWheel(e: React.WheelEvent<HTMLCanvasElement>) {
    if (e.deltaY === 0) return;

    const
      actualPos = {
        x: e.clientX - canvasWidth / 2,
        y: canvasHeight / 2 - e.clientY
      },
      xs = (actualPos.x - moveOffset.x) / scale,
      ys = (actualPos.y - moveOffset.y) / scale;

    const factor = 1 + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.max(5, scale * factor));

    const offset = {
      x: actualPos.x - xs * (scale * factor),
      y: actualPos.y - ys * (scale * factor),
    };

    setMoveOffset(offset);
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setLastClickPos({x: e.screenX, y: e.screenY});
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
    setLastClickPos({x: e.touches[0].screenX, y: e.touches[0].screenY});
  }

  function handleTouchMove(e: React.TouchEvent<HTMLCanvasElement>) {
    if (lastClickPos === undefined) return;

    const touchPos = {
      x: e.touches[0].screenX,
      y: e.touches[0].screenY
    };

    const deltaPos = {
      x: lastClickPos.x - touchPos.x,
      y: lastClickPos.y - touchPos.y,
    }

    setMoveOffset({
      x: moveOffset.x - deltaPos.x,
      y: moveOffset.y + deltaPos.y,
    });

    setLastClickPos(touchPos);
  }

  return <canvas
    ref={canvasRef}
    height={canvasHeight}
    width={canvasWidth}
    onWheel={handleWheel}
    onMouseDown={handleMouseDown}
    onMouseLeave={handleMouseUp}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleMouseUp}
  />;
}
