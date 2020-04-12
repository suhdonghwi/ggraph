import React, {useRef, useEffect} from 'react';

import Pos, {midpoint} from '../Pos';

interface CanvasData {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  offset: Pos;
  scale: number;
}

function drawAxis({ctx, width, height, offset}: CanvasData) {
  const xMiddle = width / 2 + offset.x;
  const yMiddle = height / 2 - offset.y;
  ctx.moveTo(0, yMiddle);
  ctx.lineTo(width, yMiddle);
  ctx.stroke();

  ctx.moveTo(xMiddle, 0);
  ctx.lineTo(xMiddle, height);
  ctx.stroke();
}

function convertPos({width, height, offset, scale}: CanvasData, pos: Pos) {
  return {
    x: width / 2 + (pos.x * scale) + offset.x,
    y: height / 2 - (pos.y * scale) - offset.y
  };
}

function getRange(size: number, scale: number, offset: number) {
  return {
    start: -(size / 2 + offset) / scale,
    end: (size / 2 - offset) / scale
  };
}

function drawPoints({ctx, height}: CanvasData, points: Array<Pos>) {
  let prevPoint: Pos | null = null;
  ctx.beginPath();

  for (const point of points) {
    if (prevPoint !== null && Math.abs(point.y - prevPoint.y) < height) {
      ctx.lineTo(point.x, point.y);
    } else {
      ctx.moveTo(point.x, point.y);
    }

    prevPoint = point;
  }

  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawFunction(data: CanvasData, f: (x: number) => number) {
  const {width, offset, scale} = data;
  const x = getRange(width, scale, offset.x);

  let points: Array<Pos> = [];
  for (let i = x.start; i < x.end; i += (x.end - x.start) / (width ** 1.5)) {
    const drawPos = convertPos(data, {x: i, y: f(i)});
    points.push(drawPos);
  }
  drawPoints(data, points);
}

function drawFunctionGrid(data: CanvasData, f: (x: number, y: number) => number) {
  const {width, height, offset, scale} = data;

  const x = getRange(width, scale, offset.x);
  const y = getRange(height, scale, offset.y);
  const factor = width;

  let posMatrix = [];
  for (let i = y.start; i < y.end; i += (y.end - y.start) / factor) {
    let posVector = [];
    for (let j = x.start; j < x.end; j += (x.end - x.start) / factor) {
      posVector.push({
        isPositive: f(j, i) >= 0,
        pos: convertPos(data, {x: j, y: i})
      });
    }
    posMatrix.push(posVector);
  }

  for (let i = 0; i < posMatrix.length - 1; i++) {
    for (let j = 0; j < posMatrix[i].length - 1; j++) {
      const points = [];
      const spots = [
        [posMatrix[i][j], posMatrix[i][j + 1]],
        [posMatrix[i][j], posMatrix[i + 1][j]],
        [posMatrix[i + 1][j], posMatrix[i + 1][j + 1]],
        [posMatrix[i][j + 1], posMatrix[i + 1][j + 1]],
      ];

      for (const spot of spots) {
        if (spot[0].isPositive !== spot[1].isPositive) {
          points.push(midpoint(spot[0].pos, spot[1].pos));
        }
      }

      drawPoints(data, points);
    }
  }
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 1000;
  const canvasHeight = 800;

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const canvasData = {
      ctx,
      width: canvasWidth,
      height: canvasHeight,
      offset: {x: 0, y: 0},
      scale: 100,
    };

    drawAxis(canvasData);
    //drawFunction(canvasData, x => x + 10);
    //drawFunction(canvasData, x => Math.sin(x / 10) * 30);
    //drawFunction(canvasData, x => Math.cos(x / 10) * 30);
    //drawFunction(canvasData, x => (Math.tan(x)));
    //drawFunction(canvasData, x => x);
    //drawFunctionGrid(canvasData, (x, y) => x ** 2 + y ** 2 - 1000);
    //drawFunctionGrid(canvasData, (x, y) => Math.sin(x) - Math.cos(y));
    //drawFunctionGrid(canvasData, (x, y) => x ** y - y ** x);
    //drawFunction(canvasData, x => 1 / (1 + Math.exp(-x)));
    //drawFunction(canvasData, x => x ** x);
    //drawFunctionGrid(canvasData, (x, y) => x ** x - y);
    /*drawFunction(canvasData, (x) => {
      let sum = 0;
      for (let n = 0; n <= 100; n++) {
        sum += 0.5 ** n * Math.cos(1.5 ** n * Math.PI * x)
      }

      return sum;
    });*/

  }, [canvasRef]);

  return <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />;
}
