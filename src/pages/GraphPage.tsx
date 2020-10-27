import React, { useState } from "react";

import Canvas from "../components/Canvas";
import FunctionList from "../components/FunctionList";
import MathFunction from "../utils/MathFunction";

export default function GraphPage() {
  const [fs, setFs] = useState<MathFunction[]>([
    new MathFunction("y = sin(x)", "#40c057"),
  ]);

  return (
    <main>
      <Canvas functions={fs} />
      <FunctionList value={fs} onChangeValue={(v) => setFs(v)} />
    </main>
  );
}
