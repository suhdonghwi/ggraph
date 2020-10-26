import React, {useState} from 'react';

import './App.css';
import Canvas from './components/Canvas';
import List from './components/List';

function App() {
  const [fs, setFs] = useState<string[]>([]);

  return (
    <div className="App">
      <Canvas functions={fs}/>
      <List value={fs} onChangeValue={(v) => setFs(v)} />
    </div>
  );
}

export default App;
