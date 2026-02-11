import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [totalMineral, setTotalMineral] = useState(900);
  const [mineral, setMineral] = useState(0);
  const [ressource, setRessource] = useState(50);
  const [tiredness, setTiredness] = useState(0);
  const [miner, setMiner] = useState(1);
  const [drill, setDrill] = useState(0);
  const [marketPrice, setMaketPrice] = useState(5);
  const [minerPrice, setMinerPrice] = useState(500);
  const [drillPrice, setDrillPrice] = useState(1000);
  const [money, setMoney] = useState(1500);

  const ressourceTimerRef = useRef(null);
  const drillTimerRef = useRef(null);

  const [unlockMiner, setUnlockMiner] = useState(false);
  const [unlockDrill, setUnlockDrill] = useState(false);

  useEffect(() => {
    if (ressourceTimerRef.current) {
      clearInterval(ressourceTimerRef.current);
    }

    if (miner > 1) {
      ressourceTimerRef.current = setInterval(() => {
        setRessource((current) => Math.max(0, current - Math.round(randomFunction(4, 5) * (miner / 1.4))));
      }, 3000);
    }

    return () => {
      if (ressourceTimerRef.current) {
        clearInterval(ressourceTimerRef.current);
        ressourceTimerRef.current = null;
      }
    };
  }, [miner]);

  useEffect(() => {
    if (totalMineral >= 50) {
      setUnlockMiner(true);
    }
  }, [totalMineral])

  useEffect(() => {
    if (totalMineral >= 1000) {
      setUnlockDrill(true);
    }
  }, [totalMineral]);

  useEffect(() => {
    if (drillTimerRef.current) {
      clearInterval(drillTimerRef.current);
    }

    if (drill > 0 && ressource !== 0) {
      drillTimerRef.current = setInterval(() => {
        setMineral((current) => current + drill);
        setTotalMineral((current) => current + drill);
      }, 1000);
    }

    return () => {
      if (drillTimerRef.current) {
        clearInterval(drillTimerRef.current);
        drillTimerRef.current = null;
      }
    };
  }, [drill, ressource]);

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
    ressource !== 0 ? setMineral((current) => current + miner) : setMineral((current) => current + 1);
    ressource !== 0 ? setTotalMineral((current) => current + miner) : setTotalMineral((current) => current + 1);
    setTiredness((current) => current + (randomFunction(3, 4) * Math.round(miner / 1.33)));
  };

  const handleRessource = () => {
    setRessource((current) => current + 20);
    setMoney((current) => current - 7);
  }

  const handleSell = () => {
    setMoney(money + marketPrice * mineral);
    setMineral(0);
  }

  const addMiner = () => {
    setMiner((current) => current + 1);
    setMoney((current) => current - minerPrice);
    setMinerPrice((current) => current + 200);
  }

  const addDrill = () => {
    setDrill((current) => current + 1);
    setMoney((current) => current - drillPrice);
    setDrillPrice((current) => current + 500);
  }

  return (
    <>
      <h1>
        Total minerals : {totalMineral}
      </h1>
      {/** Data of meterials on our possession */}
      <h1>
        Minerals collected : {mineral}
        <button onClick={handleClick}>Collect</button>
      </h1>
      {miner > 1 && (
      <h1>
        Ressources : {ressource}
        <button onClick={handleRessource}>Feed the worker</button>
      </h1>
      )}

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

      {unlockDrill && (
        <h1>
          Drills : {drill}
          <button onClick={addDrill} disabled={money < drillPrice}>Import drill</button>
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
