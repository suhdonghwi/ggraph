export function midpoint(p: Pos, q: Pos) {
  return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
}

export default interface Pos {
  x: number;
  y: number;
}
