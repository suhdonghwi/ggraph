import React, {useRef, useEffect} from 'react';

import Pos from '../Pos';

interface CanvasData {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  offset: Pos;
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

function drawPixel(canvasWidth: number, imageData: ImageData, pos: Pos, r: number, g: number, b: number, a: number) {
  const index = (Math.round(pos.x) + Math.round(pos.y) * canvasWidth) * 4;

  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}

function convertPos({width, height, offset}: CanvasData, pos: Pos) {
  return {x: width / 2 + pos.x + offset.x, y: height / 2 - pos.y - offset.y};
}


function drawFunction(data: CanvasData, f: (x: number) => number) {
  const imageData = data.ctx.getImageData(0, 0, data.width, data.height);

  for (let i = -(data.width / 2 + data.offset.x); i < data.width / 2 - data.offset.x; i += 0.001) {
    const drawPos = convertPos(data, {x: i, y: f(i)});
    drawPixel(data.width, imageData, drawPos, 0, 0, 0, 255);
  }
  data.ctx.putImageData(imageData, 0, 0);
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 1000;
  const canvasHeight = 500;

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const canvasData = {ctx, width: canvasWidth, height: canvasHeight, offset: {x: 100, y: 100}};

    drawAxis(canvasData);
    drawFunction(canvasData, x => x + 10);
    drawFunction(canvasData, x => Math.sin(x / 10) * 30);
    drawFunction(canvasData, x => Math.cos(x / 10) * 30);
    drawFunction(canvasData, x => Math.tan(x / 30) * 30);

  }, [canvasRef]);

  return <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />;
}
