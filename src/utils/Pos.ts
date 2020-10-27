export function midpoint(p: Pos, q: Pos) {
  return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
}

export default class Pos {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
