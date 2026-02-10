import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [miner, setMiner] = useState(1);
  const [tiredness, setTiredness] = useState(0);

  function randomTiredness(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleClick = () => {
    setCount(count + miner)
    setTiredness(tiredness + randomTiredness(3, 4))
  };

  const addMiner = () => {
    setMiner(miner + 1)
  }

  return (
    <>
      <h1>
        Minerals collected : {count}
        <button onClick={handleClick}>Collect</button>
      </h1>
      <h1>
        Miners hired : {miner - 1}
        <button onClick={addMiner}>Hire miner</button>
      </h1>
      <h1>
        Tiredness : {tiredness/10}%
      </h1>
    </>
  )
  
}

export default App;
