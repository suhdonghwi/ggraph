import React, {useState} from 'react';

import Canvas from '../components/Canvas';
import List from '../components/List';

function GraphPage() {
  const [fs, setFs] = useState<string[]>([]);

  return (
    <main>
      <Canvas functions={fs}/>
      <List value={fs} onChangeValue={(v) => setFs(v)} />
    </main>
  );
}

export default GraphPage;
