import React, {useRef, useEffect} from 'react';

import Pos from '../Pos';

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

function drawPixel({width}: CanvasData, imageData: ImageData, pos: Pos, r: number, g: number, b: number, a: number) {
  const index = (Math.round(pos.x) + Math.round(pos.y) * width) * 4;

  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}

function convertPos({width, height, offset, scale}: CanvasData, pos: Pos) {
  return {
    x: width / 2 + (pos.x * scale) + offset.x,
    y: height / 2 - (pos.y * scale) - offset.y
  };
}


function drawFunction(data: CanvasData, f: (x: number) => number) {
  const {ctx, width, height, offset, scale} = data;
  const imageData = data.ctx.getImageData(0, 0, width, height);

  const startX = -(width / 2 + offset.x) / scale;
  const endX = (width / 2 - offset.x) / scale;
  for (let i = startX; i < endX; i += (endX - startX) / (width ** 2)) {
    const drawPos = convertPos(data, {x: i, y: f(i)});
    drawPixel(data, imageData, drawPos, 0, 0, 0, 255);
  }
  ctx.putImageData(imageData, 0, 0);
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 1000;
  const canvasHeight = 500;

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const canvasData = {
      ctx,
      width: canvasWidth,
      height: canvasHeight,
      offset: {x: 0, y: 0},
      scale: 0.5,
    };

    drawAxis(canvasData);
    //drawFunction(canvasData, x => x + 10);
    //drawFunction(canvasData, x => Math.sin(x / 10) * 30);
    //drawFunction(canvasData, x => Math.cos(x / 10) * 30);
    drawFunction(canvasData, x => Math.tan(x / 30) * 30);

  }, [canvasRef]);

  return <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />;
}
