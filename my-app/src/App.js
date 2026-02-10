import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [mineral, setMineral] = useState(0);
  const [ressource, setRessource] = useState(10);
  const [tiredness, setTiredness] = useState(0);
  const [miner, setMiner] = useState(1);
  const [marketPrice, setMaketPrice] = useState(5);
  const [minerPrice, setMinerPrice] = useState(500)
  const [money, setMoney] = useState(0);
  const ressourceTimerRef = useRef(null);

  const [unlockMiner, setUnlockMiner] = useState(false)

  useEffect(() => {
    if (ressourceTimerRef.current) {
      clearInterval(ressourceTimerRef.current);
    }

    ressourceTimerRef.current = setInterval(() => {
      setRessource((current) => Math.max(0, current - Math.round(randomFunction(4, 5) * (miner / 1.4))));
    }, 3000);

    return () => {
      if (ressourceTimerRef.current) {
        clearInterval(ressourceTimerRef.current);
        ressourceTimerRef.current = null;
      }
    };
  }, [miner]);

  useEffect(() => {
    if (mineral >= 50) {
      setUnlockMiner(true);
    }
  }, [mineral])

  useEffect(() => {
    const marketPriceTimer = setInterval(() => {
      setMaketPrice(randomFunction(4, 9));
    }, 9000);

    return () => clearInterval(marketPriceTimer);
  }, []);

  function randomFunction(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleClick = () => {
    {ressource != 0 ? setMineral((current) => current + miner) : setMineral((current) => current + 1)}
    setTiredness((current) => current + (randomFunction(3, 4) * Math.round(miner / 1.33)));
  };

  const handleRessource = () => {
    setRessource((current) => current + 20);
    setMoney((current) => current - 7);
  }

  const handleSell = () => {
    setMoney(money + marketPrice * mineral);
    setMineral(0)
  }

  const addMiner = () => {
    setMiner((current) => current + 1)
    setMoney((current) => current - minerPrice)
    setMinerPrice((current) => current + 200)
  }

  return (
    <>
      {/** Data of meterials on our possession */}
      <h1>
        Minerals collected : {mineral}
        <button onClick={handleClick}>Collect</button>
      </h1>
      <h1>
        Ressources : {ressource}
        <button onClick={handleRessource}>Feed the worker</button>
      </h1>
      {/** Level of fatigue */}
      <h1>
        Tiredness : {tiredness/10}%
      </h1>
      {/** if condition is met, we unlock Miner(s) which adds +1 at the material harvest for each miner */}
      {unlockMiner && (
        <h1>
          Miners hired : {miner - 1}
          <button onClick={addMiner} disabled={money < minerPrice}>Hire miner</button>
          : {minerPrice}$
        </h1>
      )}
      <h1>
        Market!
      </h1>
        <h2>Price of now : {marketPrice}</h2>
      <h1>
        Money : {money}$
        <button onClick={handleSell}>Sell !</button>
      </h1>
    </>
  )
  
}

export default App;
