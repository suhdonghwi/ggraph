import React, {useRef, useEffect} from 'react';

import {CanvasData, drawAxis, drawFunction, drawFunctionGrid} from '../utils/Graph';


export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 1000;
  const canvasHeight = 800;

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const canvasData: CanvasData = {
      ctx,
      width: canvasWidth,
      height: canvasHeight,
      offset: {x: 0, y: 0},
      scale: 100,
    };

    drawAxis(canvasData);
    drawFunction(canvasData, x => x + 10);
    drawFunction(canvasData, x => Math.sin(x));
    drawFunction(canvasData, x => Math.cos(x / 10) * 30);
    drawFunction(canvasData, x => (Math.tan(x)));
    drawFunction(canvasData, x => x);
    //drawFunctionGrid(canvasData, (x, y) => x ** 2 + y ** 2 - 1000);
    //drawFunctionGrid(canvasData, (x, y) => Math.sin(x) - Math.cos(y));
    //drawFunctionGrid(canvasData, (x, y) => x ** y - y ** x);
    //drawFunction(canvasData, x => 1 / (1 + Math.exp(-x)));
    //drawFunction(canvasData, x => x ** x);
    //drawFunctionGrid(canvasData, (x, y) => x ** x - y);
    drawFunction(canvasData, (x) => {
      let sum = 0;
      for (let n = 0; n <= 100; n++) {
        sum += 0.5 ** n * Math.cos(5 ** n * Math.PI * x)
      }
      return sum;
    });

  }, [canvasRef]);

  return <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />;
}
