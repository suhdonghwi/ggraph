import Pos, {midpoint} from './Pos';
import * as math from 'mathjs';

export interface CanvasData {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  offset: Pos;
  scale: number;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function zoomSequence(i: number) {
  const m = mod(i, 3)
  const n = Math.floor(i / 3);
  if (m === 0) {
    return 10 ** n;
  } else if (m === 1) {
    return 2 * 10 ** n;
  } else {
    return 5 * 10 ** n;
  }
}

function zoomDiff(minDiff: number) {
  let d = 0;
  for (let i = 10; i > -15; i--) {
    d = zoomSequence(i);
    if (d < minDiff) {
      break;
    }
  }

  return d;
}

//TODO: Generalize mark drawing functions
function drawXAxisMark(data: CanvasData) {
  const {ctx, scale, width, height, offset} = data;
  const xRange = getRange(width, scale, offset.x);

  const xDiff = xRange.end - xRange.start;
  const count = Math.min(10, width / 200);
  const d = zoomDiff(xDiff / count);

  ctx.font = "22px monospace";
  for (let i = xRange.start - (xRange.start % d); i <= xRange.end; i += d) {
    if (Math.abs(i) < 1e-10) continue;
    const pos = convertPos(data, {x: i, y: 0});
    ctx.fillRect(pos.x - 1, clamp(pos.y - 12, -12, height - 12), 2, 24);

    const posString = (+i.toPrecision(5)).toString();
    const textWidth = ctx.measureText(posString).width;
    const yOffset = (pos.y > height / 2 ? -1 : 1) * 28;
    const yPos = clamp(pos.y + 7 + yOffset, yOffset + 6, height + yOffset);
    ctx.fillText(posString, pos.x - textWidth / 2, yPos);
  }
}

function drawYAxisMark(data: CanvasData) {
  const {ctx, scale, width, height, offset} = data;
  const yRange = getRange(height, scale, offset.y);

  const yDiff = yRange.end - yRange.start;
  const count = Math.min(6, height / 300);
  const d = zoomDiff(yDiff / count);

  ctx.font = "22px monospace";
  for (let i = yRange.start - (yRange.start % d); i <= yRange.end; i += d) {
    if (Math.abs(i) < 1e-10) continue;
    const pos = convertPos(data, {x: 0, y: i});
    ctx.fillRect(clamp(pos.x - 12, -12, width - 12), pos.y - 1, 24, 2);

    const posString = (+i.toPrecision(5)).toString();
    const textWidth = ctx.measureText(posString).width;
    const xOffset = pos.x > width / 2 ? -textWidth - 13 : 24;
    const xPos = clamp(pos.x - 6 + xOffset, xOffset, width + xOffset - textWidth);
    ctx.fillText(posString, xPos, pos.y + 8);
  }
}

export function drawAxis(data: CanvasData) {
  const {ctx, width, height, offset} = data;
  const xMiddle = width / 2 + offset.x;
  const yMiddle = height / 2 - offset.y;

  ctx.moveTo(0, yMiddle);
  ctx.lineTo(width, yMiddle);

  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.moveTo(xMiddle, 0);
  ctx.lineTo(xMiddle, height);
  ctx.strokeStyle = "black";
  ctx.stroke();

  drawXAxisMark(data);
  drawYAxisMark(data);
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

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

function drawPoints({ctx, height}: CanvasData, points: Array<Pos>) {
  if (points.length === 0) return;
  let prevPoint = points.shift()!;

  ctx.beginPath();
  ctx.moveTo(prevPoint.x, prevPoint.y);

  function isVisible(point: Pos) {
    return point.y <= height && point.y >= 0;
  }

  for (const point of points) {
    if (isVisible(point) || isVisible(prevPoint)) {
      ctx.lineTo(point.x, point.y);
    } else {
      ctx.moveTo(point.x, clamp(point.y, -height, height));
      //ctx.moveTo(point.x, point.y);
    }
    prevPoint = point;
  }

  ctx.lineWidth = 4;
  ctx.strokeStyle = "#228be6";
  ctx.stroke();
}

export function drawFunction(data: CanvasData, f: math.EvalFunction) {
  const {width, offset, scale} = data;
  const x = getRange(width, scale, offset.x);

  let points: Array<Pos> = [];
  const fineness = 2;

  //console.log(x.end - x.start, width / scale * fineness);
  for (let i = x.start; i <= x.end; i += (x.end - x.start) / (width * fineness)) {
    const drawPos = convertPos(data, {x: i, y: f.evaluate({x: i})});
    points.push(drawPos);
  }

  drawPoints(data, points);
}

export function drawFunctionGrid(data: CanvasData, f: (x: number, y: number) => number) {
  const {width, height, offset, scale} = data;

  const x = getRange(width, scale, offset.x);
  const y = getRange(height, scale, offset.y);
  const factor = 100;

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
