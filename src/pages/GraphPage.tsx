import React, {useState} from 'react';

import Canvas from '../components/Canvas';
import FunctionList from '../components/FunctionList';

function GraphPage() {
  const [fs, setFs] = useState<string[]>([]);

  return (
    <main>
      <Canvas functions={fs}/>
      <FunctionList value={fs} onChangeValue={(v) => setFs(v)} />
    </main>
  );
}

export default GraphPage;
