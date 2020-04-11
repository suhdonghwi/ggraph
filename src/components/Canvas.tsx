import React, {useRef, useEffect} from 'react';

import Pos from '../Pos';

interface CanvasData {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

function f(x: number) {
  return x + 100;
}

function drawAxis({ctx, width, height}: CanvasData) {
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
}

function drawPixel(canvasWidth: number, imageData: ImageData, pos: Pos, r: number, g: number, b: number, a: number) {
  const index = (Math.round(pos.x) + Math.round(pos.y) * canvasWidth) * 4;

  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}

function convertPos({width, height}: CanvasData, pos: Pos) {
  return {x: width / 2 + pos.x, y: height / 2 - pos.y};
}


function drawFunction(data: CanvasData, f: (x: number) => number) {
  const imageData = data.ctx.getImageData(0, 0, data.width, data.height);

  for (let i = -data.width / 2; i < data.width / 2; i += 0.05) {
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
    const canvasData = {ctx, width: canvasWidth, height: canvasHeight};

    drawAxis(canvasData);
    //drawFunction(canvasData, f);
    drawFunction(canvasData, x => Math.sin(x / 10) * 10);
  }, [canvasRef]);

  return <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />;
}
