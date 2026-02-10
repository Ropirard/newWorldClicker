import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1)
  };

  return (<h1>
    Minerals collected : {count}
    <button onClick={handleClick}>Collect</button>
  </h1>
  )
}

export default App;
