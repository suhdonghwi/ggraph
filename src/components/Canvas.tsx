import React, {useRef, useEffect, useState} from 'react';

import {CanvasData, drawAxis, drawFunction, drawFunctionGrid} from '../utils/Graph';


export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 1000;
  const canvasHeight = 800;

  const [scale, setScale] = useState(100); 
   const [moveOffset, setMoveOffset] = useState({x: 0, y: 0});

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
    //drawFunction(canvasData, x => x + 10);
    //drawFunction(canvasData, x => Math.sin(x));
    //drawFunction(canvasData, x => Math.cos(x / 10) * 30);
    //drawFunction(canvasData, x => (Math.tan(x)));
    drawFunction(canvasData, x => x % 1);
    //drawFunctionGrid(canvasData, (x, y) => x ** 2 + y ** 2 - 1000);
    //drawFunctionGrid(canvasData, (x, y) => Math.sin(x) - Math.cos(y));
    //drawFunctionGrid(canvasData, (x, y) => x ** y - y ** x);
    drawFunction(canvasData, x => 1 / (1 + Math.exp(-x)));
    //drawFunction(canvasData, x => x ** x);
    //drawFunctionGrid(canvasData, (x, y) => x ** x - y);
    //drawFunction(canvasData, (x) => {
    //  let sum = 0;
    //  for (let n = 0; n <= 100; n++) {
    //    sum += 0.5 ** n * Math.cos(5 ** n * Math.PI * x)
    //  }
    //  return sum;
    //});

  }, [canvasRef, scale, moveOffset]);

  function handleWheel(e: React.WheelEvent<HTMLCanvasElement>) {
    if (e.deltaY === 0) return;

    const
      actualPos = {x: e.clientX - canvasWidth / 2, y: canvasHeight / 2 - e.clientY},
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

  return <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} onWheel={handleWheel} />;
}
