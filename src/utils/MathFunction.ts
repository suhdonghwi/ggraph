import * as math from "mathjs";

export default class MathFunction {
  rawBody: string;
  body: math.EvalFunction;
  color: string;

  constructor(bodyStr: string, color: string) {
    this.rawBody = bodyStr;
    this.body = math.compile(bodyStr);
    this.color = color;
  }
}
