import { useState } from "react";
import Startup from './components/Startup'
import Quiz from "./components/Quiz"
import './App.css';

function App() {
  const [gameState, setGameState] = useState(false)

  function changeGameState() {
    setGameState(prevGameState => !prevGameState)
  }

  return (
    <div className="App">
      {!gameState ? <Startup changeGameState={changeGameState}/> : <Quiz />}
    </div>
  );
}

export default App;
