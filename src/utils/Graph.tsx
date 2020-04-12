import Pos, {midpoint} from './Pos';

export interface CanvasData {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  offset: Pos;
  scale: number;
}

export function drawAxis({ctx, width, height, offset}: CanvasData) {
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
    }

    prevPoint = point;
  }

  ctx.lineWidth = 2;
  ctx.stroke();
}

export function drawFunction(data: CanvasData, f: (x: number) => number) {
  const {width, offset, scale} = data;
  const x = getRange(width, scale, offset.x);

  let points: Array<Pos> = [];
  const fineness = 100;
  for (let i = x.start; i < x.end; i += (x.end - x.start) / (width / scale * fineness)) {
    const drawPos = convertPos(data, {x: i, y: f(i)});
    points.push(drawPos);
  }

  drawPoints(data, points);
}

export function drawFunctionGrid(data: CanvasData, f: (x: number, y: number) => number) {
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
