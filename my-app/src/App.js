import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [mineral, setMineral] = useState(0);
  const [miner, setMiner] = useState(1);
  const [tiredness, setTiredness] = useState(0);
  const [unlockMiner, setUnlockMiner] = useState(false)

  useEffect(() => {
    if (mineral >= 50) {
      setUnlockMiner(true);
    }
  })

  function randomTiredness(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleDelete = () => {
    setMineral(mineral - 1)
  }

  const handleClick = () => {
    setMineral(mineral + miner)
    setTiredness(tiredness + randomTiredness(3, 4))
  };

  const addMiner = () => {
    setMiner(miner + 1)
  }

  return (
    <>
      <h1>
        Minerals collected : {mineral}
        <button onClick={handleClick}>Collect</button>
        <button onClick={handleDelete}>Throw</button>
      </h1>
      <h1>
        Tiredness : {tiredness/10}%
      </h1>
      {unlockMiner && (
        <h1>
          Miners hired : {miner - 1}
          <button onClick={addMiner}>Hire miner</button>
        </h1>
      )}
    </>
  )
  
}

export default App;
